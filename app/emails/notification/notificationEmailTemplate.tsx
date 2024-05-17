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
  comment?: any;
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
        : type === "request"
        ? `Notificación de solicitud: ${request.title}`
        : "Notificación de comentario"}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={
            "https://firebasestorage.googleapis.com/v0/b/rombo-design.appspot.com/o/Logos%2FRomboLogo.png?alt=media&token=b5b67c3d-7348-418d-9400-63698df7571a"
          }
          alt="Rombo Logo"
        />
        <Text style={title}>
          <strong>{`Notificación | ${
            type === "request" || type === "comment"
              ? request.title
              : brand.title
          }`}</strong>
        </Text>
        <Section style={section}>
          <Text style={text}>¡Hola!</Text>
          <Text style={text}>
            {type === "brand" ? (
              <>
                Tenemos una notificación para la marca:
                <strong>{brand.title}</strong>
              </>
            ) : (
              <>
                Tenemos una nueva notificación para la solicitud:
                <strong>{request.title}</strong>
              </>
            )}
          </Text>

          <>
            {type === "brand" ? (
              <Text style={text}>
                Marca: <strong>{brand.title}</strong>
              </Text>
            ) : (
              <Text style={text}>
                Solicitud: <strong>{request.title}</strong>
              </Text>
            )}
          </>
          <Text style={text}>
            Mensaje: <strong>{message}</strong>
          </Text>

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
