class Http {
  async get(url1, url2, url3, url4) {
    const resUser = await fetch(url1);
    const dataUser = await resUser.json();
    const resComments = await fetch(url2);
    const dataRes = await resComments.json();
    const resReplies = await fetch(url3);
    const dataReplies = await resReplies.json();
    const resultRespondReplies = await fetch(url4);
    const dataRespondReplies = await resultRespondReplies.json();
    return {
      dataUser,
      comments: dataRes,
      replies: dataReplies,
      respondReplies: dataRespondReplies,
    };
  }
  async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return dataRes;
  }
  async put(url, data) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataRes = await response.json();
    return dataRes;
  }
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataRes = "deleted";
    return dataRes;
  }
}
export const http = new Http();
