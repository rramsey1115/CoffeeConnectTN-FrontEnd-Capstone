// const key = `in1TQZx2L-Gvdw8FbfrbXt4_5JxQgwCmOLtXk_HLFkwdITFs7QpnSwrf77UZAyAuuVSRfweWXilKRou-NULaDW8dkuJRFRh3BOMSDwp2Ed9dfTTw5W-rsKYsp_AuZXYx`;

export const getCoffeeShops = async () => {
  return fetch("http://localhost:8088/businesses").then(res => res.json())
};
