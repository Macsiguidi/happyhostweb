document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const checkin = params.get("checkin");
    const checkout = params.get("checkout");
  
    if (!checkin || !checkout) return;
  
    const fechaInicio = new Date(checkin);
    const fechaFin = new Date(checkout);
    const diasRango = [];
    for (let d = new Date(fechaInicio); d <= fechaFin; d.setDate(d.getDate() + 1)) {
      diasRango.push(d.toISOString().split("T")[0]);
    }
  
    try {
      const res = await fetch("Data/fechas_ocupadas.json");
      const data = await res.json();
  
      document.querySelectorAll(".tarjeta-alojamiento").forEach((tarjeta) => {
        const id = tarjeta.id.toLowerCase();
        const ocupadas = data[id] || [];
  
        const tieneCruce = diasRango.some(d => ocupadas.includes(d));
        if (tieneCruce) {
          tarjeta.style.display = "none";
        }
      });
    } catch (error) {
      console.error("Error al cargar fechas ocupadas:", error);
    }
  });
  
  