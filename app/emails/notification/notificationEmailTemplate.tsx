import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type NotificationEmailTemplateProps = {
  type: string;
  message: string;
  request?: any;
  brand?: any;
};

export const NotificationEmailTemplate = ({
  type,
  message,
  request,
  brand,
}: NotificationEmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      {type === "brand"
        ? `Notificación de ${brand.title}`
        : `Notificación de solicitud: ${request.title}`}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"https://www.rombo.design/_next/static/media/Logo.7967ebb3.svg"}
          width="103"
          height="32"
          alt="Rombo Logo"
        />
        <Text style={title}>
          <strong>{`Notificación | ${
            type === request ? request.title : request.brand
          }`}</strong>
        </Text>
        <Section style={section}>
          <Text style={text}>¡Hola!</Text>
          <Text style={text}>
            {type === "brand"
              ? `Tenemos una notificación para la marca: ${brand.title}`
              : `Tenemos una nueva notificación para la solicitud: ${request.title}`}
          </Text>

          <>
            {type === "brand" ? (
              <Text style={text}>Marca: {brand.title}</Text>
            ) : (
              <Text style={text}>Solicitud: {request.title}</Text>
            )}
          </>
          <Text style={text}>Mensaje: {message}</Text>

          <Button
            href={
              type === "brand"
                ? `https://www.rombo.design/portal/marcas/${brand.id}`
                : `https://www.rombo.design/portal/solicitudes/${request.id}`
            }
            style={button}
          >
            {type === "brand" ? `Ver Marca` : `Ver Solicitud`}
          </Button>
        </Section>
        <Text style={links}>
          <Link href={""} style={link}>
            Contacto
          </Link>{" "}
          ・{" "}
          <Link href={"#"} style={link}>
            Aviso de Privacidad
          </Link>
        </Text>

        <Text style={footer}>ROMBO DESIGN</Text>
      </Container>
    </Body>
  </Html>
);

export default NotificationEmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#111827",
  color: "#ffffff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};
