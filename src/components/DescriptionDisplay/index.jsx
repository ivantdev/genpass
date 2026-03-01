function DesciptionDisplay() {
  return (
    <section className="description__container">
      <h2>¿Qué hace segura una contraseña?</h2>
      <p>Una contraseña segura necesita longitud suficiente y una mezcla impredecible de mayúsculas, minúsculas, números y símbolos.</p>
      <p>También conviene evitar secuencias obvias, repeticiones contiguas y reutilizar la misma clave entre servicios distintos.</p>
      <p>Cada cuenta debería tener una contraseña <span className="bold">segura</span> y <span className="bold">única</span>. Así se reduce el impacto ante filtraciones o accesos no autorizados.</p>
      <p>Esta aplicación permite generar contraseñas de forma rápida, local y con reglas ajustables según tu caso.</p>
    </section>
  );
}

export default DesciptionDisplay;
