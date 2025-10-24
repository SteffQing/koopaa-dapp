import { AddActivityData } from "@/app/api/activities/schema";
import type {
  CreatedAjoGroup,
  JoinAjoGroup,
  ApprovalJoinAjoGroup,
} from "@/app/api/group/schema";
import { BASE_API_URL } from "@/constants";

import { Client } from "@upstash/qstash";

const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

export async function createAjo(auth: string, body: CreatedAjoGroup) {
  const res = await qstash
    .queue({
      queueName: "create_ajo",
    })
    .enqueueJSON({
      url: BASE_API_URL + "/group",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body,
    });

  return res.messageId;
}

export async function requestJoin(auth: string, body: JoinAjoGroup) {
  const { messageId } = await qstash
    .queue({
      queueName: "request_join_ajo",
    })
    .enqueueJSON({
      url: BASE_API_URL + "/group/request-join",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body,
    });

  return messageId;
}

export async function approveJoin(auth: string, body: ApprovalJoinAjoGroup) {
  const { messageId } = await qstash
    .queue({
      queueName: "approve_join_ajo",
    })
    .enqueueJSON({
      url: BASE_API_URL + "/group/approve-join",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body,
    });

  return messageId;
}

export async function contributeAction(auth: string, body: AddActivityData) {
  const { messageId } = await qstash
    .queue({
      queueName: "contribute",
    })
    .enqueueJSON({
      url: BASE_API_URL + "/activities",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
      body,
    });

  return messageId;
}
