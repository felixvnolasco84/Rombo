
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type FAQItemType = {
  question: string;
  answer: string;
};

export default function FAQItem({ item }: { item: FAQItemType }) {
  return (

    <div className="border-white border-y-2 py-4 lg:py-8 xl:py-16">
      <AccordionItem className="m-auto border-none w-10/12 lg:w-2/3 xl:w-1/2" value={item.question}>
        <AccordionTrigger className="text-lg lg:text-xl xl:text-2xl">{item.question}</AccordionTrigger>
        <AccordionContent className="lg:mt-3 xl:mt-6 text-justify text-sm lg:text-base xl:text-lg">
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
