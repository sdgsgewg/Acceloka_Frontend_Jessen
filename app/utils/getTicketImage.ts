const getTicketImage = (categoryName: string, ticketName?: string): string => {
  const lowerCategoryName = categoryName.toLowerCase();

  // Record<key , value>
  const images: Record<string, string | Record<string, string>> = {
    cinema: "/img/cinema.jpg",
    concert: "/img/concert.jpeg",
    "transportasi darat": {
      kereta: "/img/kereta.jpg",
      bus: "/img/bus.jpg",
      default: "/img/transportasi-darat.jpg",
    },
    "transportasi laut": "/img/transportasi-laut.jpeg",
    "transportasi udara": "/img/transportasi-udara.jpeg",
    hotel: "/img/hotel.jpg",
  };

  if (lowerCategoryName === "transportasi darat") {
    const transportasiDarat = images["transportasi darat"] as Record<
      string,
      string
    >;
    return (
      transportasiDarat[ticketName?.toLowerCase() ?? "default"] ||
      transportasiDarat.default
    );
  }

  return (images[lowerCategoryName] as string) || "";
};

export default getTicketImage;
