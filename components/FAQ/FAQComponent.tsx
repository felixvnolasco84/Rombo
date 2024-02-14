import FAQItem, { FAQItemType } from "./FAQItem";

const faqItems: FAQItemType[] = [
  {
    question: "¿El servicio si es “ilimitado”?",
    answer:
      "Sí pero no. Puedes solicitar la cantidad de diseños que desees, pero los trabajaremos en el orden en el que los pidas. Se entregarán a medida que los vayamos completando. Por ejemplo, si solicitas 5 diseños en un día, es probable que entreguemos los primeros 2 al día siguiente mientras continuamos trabajando en los demás.",
  },
  {
    question: "¿Hay un límite en la cantidad de solicitudes que puedo tener?",
    answer:
      "Una vez suscrito, puedes agregar tantas solicitudes de diseño como desees a tu cola, y se entregarán conforme se vayan trabajando.",
  },
  {
    question: "¿Qué tan rápido recibiré mis diseños?",
    answer:
      "En promedio, la mayoría de las solicitudes se completan en solo dos días o menos. Sin embargo, solicitudes más complejas pueden tomar más tiempo.",
  },
  {
    question: "¿Cómo funciona la función de pausa?",
    answer:
      "Entendemos que es posible que ciertos meses no tengas suficiente trabajo de diseño. Es ahí donde resulta útil poner en pausa tu suscripción, puedes pausar el servicio y guardar los días restantes del mes para activarlos cuando requieras más servicios de diseño. Tienes únicamente una pausa mensual, su propósito es ofrecer cierta flexibilidad pero no es algo que puedas utilizar para aprovecharte del servicio.",
  },
  {
    question: "¿Qué pasa si no me gusta el diseño?",
    answer:
      "¡No te preocupes! Continuaremos revisando el diseño hasta que estés 100% satisfecho.",
  },
  {
    question: "¿Hay algún trabajo de diseño que no cubran?",
    answer:
      "Absolutamente. No cubre los siguientes trabajos de diseño: modelado 3D, empaques complejos y diseño de impresión extenso (revistas, libros, etc.), ilustraciones extremadamente complejas, motion graphics avanzados, HTML, CSS, redacción de contenido o cualquier cosa que vaya en contra de los valores fundamentales de rombo.",
  },
];

export default function FAQComponent() {
  return (
    <div className="rounded-xl bg-[#F2F2F2] text-[#121415]">
      <h3 className="border-b-2 border-white py-4 text-center text-3xl md:text-4xl lg:py-8 lg:text-4xl xl:py-16 xl:text-5xl">
        FAQ
      </h3>
      {faqItems.map((item, index) => (
        <FAQItem key={index} item={item} />
      ))}
      <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
        <div className="m-auto w-10/12 lg:w-2/3 xl:w-1/2">
          <h3 className="text-lg lg:text-2xl xl:text-3xl">
            ¿Cómo realizo las solicitudes?
          </h3>
          <p className="text-justify text-sm lg:mt-3 lg:text-base xl:mt-6 xl:text-lg">
            Ofrecemos mucha flexibilidad en cómo solicitar diseños mediante
            Monday o Notion. Algunas formas comunes en que los clientes
            solicitan diseños es compartiendo documentos de Google o wireframes.
          </p>
          <p className="text-justify text-sm lg:mt-3 lg:text-base xl:mt-6 xl:text-lg">
            Requerimos los siguientes puntos:
          </p>
          <ol className="list-inside list-decimal text-justify text-sm lg:mt-3 lg:text-base xl:mt-6 xl:text-lg">
            <li>Descripción del tipo de diseño que necesitas.</li>
            <li>
              Texto e información para incluir en diseño (en caso de requerir)
            </li>
            <li>
              Formato y dimensiones (tamaño de arte, tipo de archivo a entregar)
            </li>
            <li>
              Archivos necesarios (logo, colores, presentación a diseñar etc)
            </li>
            <li>Imagen de referencia (en caso de contar con ella)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
