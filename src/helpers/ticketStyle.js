export const ticketStyle = (ticketStatus) => {
    switch (ticketStatus) {
      case "Abierto":
        return { backgroundColor: "#519259" };
      case "En progreso":
        return { backgroundColor: "#FFD365" };
      case "Resuelto":
        return { backgroundColor: "#D9534F" };
      case "Necesita reembolso":
        return { backgroundColor: "#19282F", color: "#ffffff" };
  
      default:
        break;
    }
  };