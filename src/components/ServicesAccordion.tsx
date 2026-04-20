import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

/* ---------- TYPES (single source of truth) ---------- */

export type ServiceItem = {
  title: string;
  desc: string;
  duration: string;
  price: string;
};

export type ServiceCategory = {
  category: string;
  items: ServiceItem[];
};

export type ServiceData = {
  en: ServiceCategory[];
  de: ServiceCategory[];
};

type Props = {
  categories: ServiceCategory[];
};

/* ---------- COMPONENT ---------- */

export default function ServicesAccordion({ categories }: Props) {
  return (
    <Accordion type="single" collapsible className="services-list">
      {categories.map((section, index) => (
        <AccordionItem
          key={section.category}
          value={`item-${index}`}
          className="service-accordion"
        >
          <AccordionTrigger className="service-trigger">
            <div className="service-trigger-copy">
              <span className="service-category">{section.category}</span>
              <span className="service-count">
                {section.items.length} offerings
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="service-panel">
            <div className="service-panel-inner">
              {section.items.map((item) => (
                <article key={item.title} className="service-item">
                  <div className="service-item-copy">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>

                  <div className="service-item-meta">
                    <span>{item.duration}</span>
                    <span className="price">{item.price}</span>
                  </div>
                </article>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}