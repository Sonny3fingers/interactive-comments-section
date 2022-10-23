class UI {
  constructor() {
    this.main = document.querySelector(".main");
  }
  showComments(data) {
    let output = "";
    let currentUserAddText = "";
    data.comments.forEach((comment) => {
      output += `
            <!-- COMMENTS CONTAINER -->
            <div class="comment-container flex flex-fd-column" id=${comment.id}>
              <!-- wrapper form user-info and comment-text -->
              <div class="wrapper">
                <!-- user info -->
                <div class="user-info flex flex-ai-center">
                  <span class="avatar">
                    <img src=${comment.user.image.png} alt="avatar" />
                  </span>
                  <span>${comment.user.username}</span>
                  <span>${comment.createdAt}</span>
                </div>
                <!-- comment text  -->
                <div class="comment-text">
                  <p>
                    ${comment.content}
                  </p>
                </div>
              </div>
              <!-- scores -->
              <div class="scores flex flex-ai-center flex-jc-sa">
                <button class="plusBtn"><i class="fa-solid fa-plus"></i></button>
                <span>${comment.score}</span>
                <button class="minusBtn"><i class="fa-solid fa-minus"></i></button>
              </div>
              <!-- responds -->
              <!-- conditionally render buttons -->
             ${
               comment.user.username !== data.dataUser.username
                 ? `<button class="replyBtn" ><i class="fa-solid fa-reply"></i>Reply</button>`
                 : `
              <!-- actions -->
              <div class="actions flex flex-ai-center ">
                  <button class="delete flex">
                    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                        fill="#ED6368"
                      /></svg
                    >Delete
                  </button>
                  <button class="edit flex">
                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        fill="#5357B6"
                      /></svg
                    >Edit
                  </button>
                </div>
              `
             }
            </div>`;
      //  reply to comment
      data.replies.forEach((reply) => {
        if (+reply.commentId === comment.id) {
          output += `
                      <!-- RESPOND CONTAINER -replies section -->
              
                      <div class="respond-container flex flex-fd-column" id=${
                        reply.id
                      } >
                        <!-- wrapper form user-info and comment-text -->
                        <div class="wrapper">
                          <!-- user info -->
                          <div class="user-info flex flex-ai-center">
                            <span class="avatar">
                              <img src=${reply.user.image.png} alt="avatar" />
                            </span>
                            <span>${reply.user.username}</span>
                            <span>${reply.createdAt}</span>
                          </div>
                          <!-- comment text  -->
                          <div class="comment-text">
                            <p>
                            ${reply.content}
                            </p>
                          </div>
                        </div>
                        <!-- scores -->
                        <div class="scores flex flex-ai-center flex-jc-sa">
                          <button class="plusBtn"><i class="fa-solid fa-plus" ></i></button>
                          <span>${reply.score}</span>
                          <button class="minusBtn"><i class="fa-solid fa-minus"></i></button>
                        </div>
                      
                        <!-- respond button -->
                        <!-- conditionally render buttons -->
                         ${
                           reply.user.username !== data.dataUser.username
                             ? `<button class="replyBtn">
                              <i class="fa-solid fa-reply"></i>Reply
                            </button>`
                             : `
                             <!-- actions -->
                            <div class="actions flex flex-ai-center ">
                                <button class="delete flex">
                                  <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                                      fill="#ED6368"
                                    /></svg
                                  >Delete
                                </button>
                                <button class="edit flex">
                                  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                                      fill="#5357B6"
                                    /></svg
                                  >Edit
                                </button>
                              </div>
                             `
                         }
                      </div>
                      `;
          // respond to reply
          data.respondReplies.forEach((respondReply) => {
            if (+respondReply.replyId === +reply.id) {
              output += `
                      <!-- RESPOND TO REPLY CONTAINER -replies section -->
              
                      <div class="respond-container respondReplies flex flex-fd-column" id=${
                        respondReply.id
                      } >
                        <!-- wrapper form user-info and comment-text -->
                        <div class="wrapper">
                          <!-- user info -->
                          <div class="user-info flex flex-ai-center">
                            <span class="avatar">
                              <img src=${
                                respondReply.user.image.png
                              } alt="avatar" />
                            </span>
                            <span>${respondReply.user.username}</span>
                            <span>${respondReply.createdAt}</span>
                          </div>
                          <!-- comment text  -->
                          <div class="comment-text">
                            <p>
                            ${respondReply.content}
                            </p>
                          </div>
                        </div>
                        <!-- scores -->
                        <div class="scores flex flex-ai-center flex-jc-sa">
                          <button class="plusBtn"><i class="fa-solid fa-plus" ></i></button>
                          <span>${respondReply.score}</span>
                          <button class="minusBtn"><i class="fa-solid fa-minus"></i></button>
                        </div>
                      
                        <!-- respond button -->
                        <!-- conditionally render buttons -->
                         ${
                           respondReply.user.username !== data.dataUser.username
                             ? `<button class="replyBtn">
                              <i class="fa-solid fa-reply"></i>Reply
                            </button>`
                             : `
                             <!-- actions -->
                            <div class="actions flex flex-ai-center ">
                                <button class="delete flex">
                                  <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                                      fill="#ED6368"
                                    /></svg
                                  >Delete
                                </button>
                                <button class="edit flex">
                                  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                                      fill="#5357B6"
                                    /></svg
                                  >Edit
                                </button>
                              </div>
                             `
                         }
                      </div>
                      `;
            }
          });
        }
      });
    });

    currentUserAddText = `
    <div class="add-text flex flex-fd-column">
    <textarea
      id="textArea"
      class="textArea"
      placeholder="Add a comment..."
    ></textarea>
    <span class="avatar">
      <img src=${data.dataUser.image.png} alt="avatar" />
    </span>
    <button type="submit" class="submitBtn" id="submitBtn">Send</button>
   </div>
    `;

    output += currentUserAddText;
    this.main.innerHTML = output;

    // Add to document body main div element
    document.body.appendChild(this.main);
    this.addTextInput = document.querySelector(".add-text");
  }

  createModalOverlay() {
    // Create div element
    const divEl = document.createElement("div");
    // Add class overlay
    divEl.className = "overlay flex flex-jc-c flex-ai-center";
    // Create modal div element
    const divModal = document.createElement("div");
    // Add class
    divModal.className = "modal";
    // Create header element
    const modalHeader = document.createElement("h3");
    // Add text node to modalHeader
    modalHeader.textContent = "Delete comment";
    // Append modalHeader to divModal
    divModal.appendChild(modalHeader);
    // Create paragraph element
    const paraModal = document.createElement("p");
    // Add text to paragraph
    paraModal.textContent =
      "Are you sure you want to delete this comment? This will remove the comment and can`t be undone.";
    // Append to divModal
    divModal.appendChild(paraModal);
    // Create actionsModal div element
    const actionsModal = document.createElement("div");
    // Add class to actions modal
    actionsModal.className = "actionsModal flex flex-jc-sb flex-ai-center";
    // Create button element
    const btnNo = document.createElement("button");
    // Button text
    btnNo.textContent = "No, cancel";
    // Append btnNo to divModal
    actionsModal.appendChild(btnNo);
    // Create another button for yes
    const btnYes = document.createElement("button");
    // Add text
    btnYes.textContent = "Yes, delete";
    // Append btnYes to modal
    actionsModal.appendChild(btnYes);
    // Append actions modal to div modal
    divModal.appendChild(actionsModal);
    // Append divModal to divElement
    divEl.appendChild(divModal);
    // Append divEl to body
    // this.main.appendChild(divEl);
    document.body.append(divEl);
  }

  getPreviousElementSibling(element, selector) {
    // get previous element sibling
    let preSibling = element.previousElementSibling;
    if (selector) return element;
    if (!selector) return preSibling;
    while (preSibling) {
      if (preSibling.matches(selector)) return preSibling;
      preSibling = preSibling.previousElementSibling;
    }
  }
}

export const ui = new UI();
