import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

type Data = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const validateFormData = (data: Data) => {
  const { name, email, subject, message } = data;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return { isValid: false, error: "Nome é obrigatório" };
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return { isValid: false, error: "Email válido é obrigatório" };
  }

  if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
    return { isValid: false, error: "Assunto é obrigatório" };
  }

  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return {
      isValid: false,
      error: "Mensagem deve ter pelo menos 10 caracteres",
    };
  }

  return { isValid: true };
};

// Template HTML para o email
const createEmailTemplate = (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nova mensagem do portfólio</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .content {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          border: 1px solid #e9ecef;
        }
        .field {
          margin-bottom: 20px;
        }
        .field-label {
          font-weight: 600;
          color: #495057;
          margin-bottom: 5px;
        }
        .field-value {
          background: white;
          padding: 15px;
          border-radius: 5px;
          border: 1px solid #dee2e6;
        }
        .message-content {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #dee2e6;
          color: #6c757d;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Nova Mensagem do Portfólio</h1>
        <p>Você recebeu uma nova mensagem através do seu site</p>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="field-label">Nome:</div>
          <div class="field-value">${name}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Email:</div>
          <div class="field-value">${email}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Assunto:</div>
          <div class="field-value">${subject}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Mensagem:</div>
          <div class="field-value message-content">${message}</div>
        </div>
      </div>
      
      <div class="footer">
        <p>Esta mensagem foi enviada através do formulário de contato do seu portfólio.</p>
        <p>Data: ${new Date().toLocaleString("pt-BR")}</p>
      </div>
    </body>
    </html>
  `;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { name, email, subject, message } = body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Variáveis de ambiente de email não configuradas");
      return NextResponse.json(
        { error: "Configuração de email não encontrada" },
        { status: 500 }
      );
    }

    const transporter = createTransporter();

    await transporter.verify();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfólio] ${subject}`,
      html: createEmailTemplate(name, email, subject, message),
      text: `
        Nova mensagem do portfólio
        
        Nome: ${name}
        Email: ${email}
        Assunto: ${subject}
        
        Mensagem:
        ${message}
        
        ---
        Enviado em: ${new Date().toLocaleString("pt-BR")}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email enviado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao enviar email:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
