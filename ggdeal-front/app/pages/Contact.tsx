import Breadcrumbs from "~/componets/Breadcrumbs";
import SubscribeUs from "~/sections/contact/SuscribeUs";
import Hero from "~/sections/contact/Hero";
import ContactUs from "~/sections/contact/ContactUs";

export default function Contact() {
  return (
    <>
      <Hero />
      <Breadcrumbs />
      <SubscribeUs />
      <ContactUs />
    </>
  );
}
