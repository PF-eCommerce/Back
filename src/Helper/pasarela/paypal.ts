const fetch = require("node-fetch");
const base = "https://api-m.sandbox.paypal.com";
//"https://api-m.paypal.com"

export async function createOrder() {
  try {
    const purchaseAmount = "159.35"; // TODO: pull prices from a database
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: purchaseAmount,
            },
            description: "Objeto setsual sabroso"
          },
        ],
        application_context: {
          brand_name: "mytienda.com",
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
          return_url: `${process.env["HOST"]}/capture-order-paypal`,
          cancel_url: `${process.env["HOST"]}/cancel-order-paypal`
        }
      }),
    });
    // console.log("createOrder",response)

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.log("/helper/paypal/create", error)
  }
}

async function generateAccessToken() {
  const auth = Buffer.from(process.env["CLIENT_ID"] + ":" + process.env["APP_SECRET"]).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response: any) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

export async function captureOrder(token: any) {
  try {
    const accessToken = await generateAccessToken();

    const response = await fetch(`${base}/v2/checkout/orders/${token}/capture`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.log("/helper/paypal/captureOrder", error);
  }
}