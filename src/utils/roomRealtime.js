const getRealtimeUrl = (roomCode) => {
  const apiUrl = new URL(import.meta.env.VITE_API_BASE_URL);
  const protocol = apiUrl.protocol === "https:" ? "wss:" : "ws:";
  const token = localStorage.getItem("jwt");
  const url = new URL(
    `/rooms/${encodeURIComponent(roomCode)}/ws`,
    `${protocol}//${apiUrl.host}`,
  );

  if (token) {
    url.searchParams.set("token", token);
  }

  return url.toString();
};

const getMessageType = (data) => String(data?.type || data?.event || "").toLowerCase();

export const connectRoomRealtime = ({
  roomCode,
  onRoom,
  onMatch,
  onStatus,
  onError,
}) => {
  let socket = null;
  let reconnectTimer = null;
  let closedByClient = false;
  let reconnectAttempts = 0;

  const clearReconnectTimer = () => {
    if (!reconnectTimer) return;
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  };

  const scheduleReconnect = () => {
    if (closedByClient) return;

    reconnectAttempts += 1;
    const delay = Math.min(1000 * reconnectAttempts, 5000);

    onStatus?.("disconnected");
    clearReconnectTimer();
    reconnectTimer = setTimeout(open, delay);
  };

  const handleMessage = (event) => {
    let data;

    try {
      data = JSON.parse(event.data);
    } catch {
      return;
    }

    const type = getMessageType(data);
    const payload = data?.payload || data;
    const roomPayload = data?.room || payload?.room;
    const matchPayload =
      data?.match ||
      data?.matchedMovie ||
      payload?.match ||
      payload?.matchedMovie ||
      roomPayload?.matchedMovie;

    if (roomPayload || type.includes("room")) {
      onRoom?.(roomPayload || payload);
    }

    if (matchPayload || type.includes("match")) {
      onMatch?.(matchPayload);
    }
  };

  function open() {
    if (closedByClient) return;

    onStatus?.("connecting");
    socket = new WebSocket(getRealtimeUrl(roomCode));

    socket.onopen = () => {
      reconnectAttempts = 0;
      onStatus?.("connected");
    };
    socket.onmessage = handleMessage;
    socket.onerror = () => {
      onError?.("Realtime connection failed.");
    };
    socket.onclose = scheduleReconnect;
  }

  open();

  return {
    close() {
      closedByClient = true;
      clearReconnectTimer();
      socket?.close();
      socket = null;
    },
  };
};
