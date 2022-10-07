// 1. Identificar e salvar o que mudou
// 2. Identificar para quem precisamos comunicar o que mudou
//    2.1. Identificar canal de venda do pedido mãe
//    2.2. Identiticar permissões atreladas a esse canal de venda
// 3. Criar uma notificação de email/whatsapp para cada usuário, dependendo das preferências
// 4. Separar notificações de email de notificações de whatsapp
// 5. Agrupar notificações por usuário

// 1. Comparar dados do MongoDB com o Dremio
//    1. Enviar novos eventos para a fila de eventos
// 2. Relacionar canais de venda de cada evento com permissões
// 3.

// NotificationType = "create" | "update"
// SourceType = "mother-order" | ...
// Source = ObjectId(MotherOrder) | ObjectId(...)
// Property = "status" | ...
// Value = string

// if (!pedidoMaeMongoExists) {
//   enviaSourceDeCriacao()
// } else if (pedidoMaeMongo.status !== pedidoMaeDremio.status) {
//   enviaSourceDeUpdate("status", pedidoMaeDremio.status)
// }

const motherOrders = [
  {
    id: "mother-order-1",
    salesChannelId: "globo",
  },
  {
    id: "mother-order-2",
    salesChannelId: "sbt",
  },
];

const permissions = [
  {
    salesChannel: "globo",
    user: "cris",
  },
  {
    salesChannel: "sbt",
    user: "cris",
  },
  {
    salesChannel: "globo",
    user: "rique",
  },
];

const users = [
  {
    id: "cris",
    email: "cris@cris.com",
    mobilePhone: "11912345678",
    notifications: {
      wallets: {
        email: true,
        whatsapp: true,
      },
    },
  },
  {
    id: "rique",
    email: "rique@rique.com",
    mobilePhone: "11998765432",
    notifications: {
      wallets: {
        email: true,
        whatsapp: true,
      },
    },
  },
];

const queueNotificationsSource = [
  {
    type: "create",
    sourceType: "mother-order",
    source: "mother-order-1",
  },
  {
    type: "create",
    sourceType: "mother-order",
    source: "mother-order-2",
  },
  {
    type: "update",
    sourceType: "mother-order",
    source: "mother-order-2",
    property: "status",
    value: "finished",
  },
];

function findSalesChannelPermission(salesChannelId) {
  return permissions.filter((p) => p.salesChannel === salesChannelId);
}

function findMotherOrder(motherOrderId) {
  return motherOrders.find((m) => m.id === motherOrderId);
}

function createNotifications(queue) {
  const notifications = [];

  for (let i = 0; i < queue.length; i++) {
    const message = queue[i];

    const motherOrder = findMotherOrder(message.source);
    const permissions = findSalesChannelPermission(motherOrder.salesChannelId);

    for (let j = 0; j < permissions.length; j++) {
      const permission = permissions[j];

      notifications.push({
        user: permission.user,
        whatsapp: false,
        email: false,
        interface: false,
        ...message,
      });
    }
  }

  return notifications;
}

function createMessage(notification) {
  const t = {
    create: "criado",
    "mother-order": "pedido mãe",
    update: "atualizado",
    finished: "finalizado",
    status: "status",
  };

  let message = `${notification.source} | ${t[notification.sourceType]} ${
    t[notification.type]
  }`;

  if (notification.type === "update") {
    message += ` | ${t[notification.property]} para ${t[notification.value]}`;
  }

  return message;
}

function sendNotifications(notifications) {
  let whatsapp = {};
  let email = {};

  for (let i = 0; i < notifications.length; i++) {
    const notification = notifications[i];

    const user = users.find((u) => u.id === notification.user);

    if (user.notifications.wallets.whatsapp) {
      if (!whatsapp[user.id]) {
        whatsapp[user.id] = {
          user,
          messages: [],
        };
      }
      whatsapp[user.id].messages.push(createMessage(notification));
    }

    if (user.notifications.wallets.email) {
      if (!email[user.id]) {
        email[user.id] = {
          user,
          messages: [],
        };
      }
      email[user.id].messages.push(createMessage(notification));
    }
  }

  whatsapp = Object.values(whatsapp);
  email = Object.values(email);

  console.log("================");

  console.log("WHATSAPP");
  whatsapp.forEach((n) => {
    console.log("\n");
    console.log(`Olá, ${n.user.id} -  ${n.user.mobilePhone}`);
    console.log(n.messages.join("\n"));
  });

  console.log("\n");
  console.log("================");
  console.log("\n");

  console.log("EMAIL");
  email.forEach((n) => {
    console.log("\n");
    console.log(`Olá, ${n.user.id} -  ${n.user.email}`);
    console.log(n.messages.join("\n"));
  });
}

const notifications = createNotifications(queueNotificationsSource);
sendNotifications(notifications);
