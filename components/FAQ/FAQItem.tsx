export type FAQItemType = {
  question: string;
  answer: string;
};

export default function FAQItem({ item }: { item: FAQItemType }) {
  return (
    <div className="border-y-2 border-white py-4 lg:py-8 xl:py-16">
      <div className="m-auto w-10/12 lg:w-2/3 xl:w-1/2">
        <h3 className="text-lg lg:text-xl xl:text-2xl">{item.question}</h3>
        <p className="text-justify text-sm lg:mt-3 lg:text-base xl:mt-6 xl:text-lg">
          {item.answer}
        </p>
      </div>
    </div>
  );
}
