import { http } from "./modules/http.js";
import { ui } from "./modules/ui.js";

const main = document.querySelector(".main");
let state = "addComment";

// Add listener for show comments
document.addEventListener("DOMContentLoaded", getComments);
// Add listener for post comment
main.addEventListener("click", (e) => postComment(e));
// Add listener for Reply
main.addEventListener("click", (e) => postReply(e));
// Add listener for delete button
main.addEventListener("click", (e) => deleteComment(e));
// Add listener for update
main.addEventListener("click", (e) => updateComment(e));
// Add Event Listener for Increment Score
main.addEventListener("click", (e) => incrementScore(e));

// Get comments function
function getComments() {
  http
    .get(
      "https://json-server-interactive.herokuapp.com/currentUser",
      "https://json-server-interactive.herokuapp.com/comments",
      "https://json-server-interactive.herokuapp.com/replies",
      "https://json-server-interactive.herokuapp.com/respondReplies"
    )
    .then((data) => {
      data.comments.forEach((comment) => {
        comment.createdAt = timeCounter(comment.createdAt);
      });
      data.replies.forEach((reply) => {
        reply.createdAt = timeCounter(reply.createdAt);
      });
      data.respondReplies.forEach((respondReply) => {
        respondReply.createdAt = timeCounter(respondReply.createdAt);
      });

      ui.showComments(data);
    })
    .catch((err) => console.log(err));
}

// Time counter function
function timeCounter(commentPosted) {
  // Initialize time ago variable
  let timeAgo;
  // Add if statement for preventing saved dates to interfering for each loop
  if (
    commentPosted === "1 month ago" ||
    commentPosted === "2 weeks ago" ||
    commentPosted === "1 week ago" ||
    commentPosted === "2 days ago"
  ) {
    timeAgo = commentPosted;
    return timeAgo;
  } else {
    // Get time of comment posted date
    const commentPostedTime = new Date(commentPosted).getTime();
    // time now
    const now = new Date().getTime();
    // gapTime
    const gapTime = now - commentPostedTime;
    // time measures
    const seconds = 1000;
    const minute = seconds * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Calculations
    const textDay = Math.floor(gapTime / day);
    const textHour = Math.floor((gapTime % day) / hour);
    const textMinute = Math.floor((gapTime % hour) / minute);

    let timeAgo;

    if (textDay === 0 && textHour === 0 && textMinute === 0) {
      timeAgo = "just now";
    } else if (textDay === 0 && textHour === 0 && textMinute !== 0) {
      switch (true) {
        case textMinute === 1:
          timeAgo = `${textMinute} minute ago`;
          break;
        case textMinute === 2:
          timeAgo = `${textMinute} minute ago`;
          break;
        case textMinute === 3:
          timeAgo = `${textMinute} minute ago`;
          break;
        case textMinute <= 5:
          timeAgo = `${textMinute} minute ago`;
          break;
        case textMinute <= 20:
          timeAgo = `15 minutes ago`;
          break;
        case textMinute <= 40:
          timeAgo = `30 minutes ago`;
          break;
        case textMinute <= 59:
          timeAgo = `1 hour ago`;
          break;

        default:
          break;
      }
      return timeAgo;
    } else if (textDay === 0 && textHour !== 0) {
      switch (true) {
        case textHour <= 1:
          timeAgo = `${textHour} hour ago`;
          break;
        case textHour <= 22:
          timeAgo = `${textHour} hours ago`;
          break;
        case textHour <= 24:
          timeAgo = `1 day ago`;
          break;

        default:
          break;
      }
      return timeAgo;
    } else if (textDay !== 0) {
      switch (true) {
        case textDay <= 1:
          timeAgo = `${textDay} day ago`;
          break;
        case textDay <= 25:
          timeAgo = `${textDay} days ago`;
          break;
        case textDay <= 35:
          timeAgo = `1 month ago`;
          break;
        case textDay <= 60:
          timeAgo = `2 months ago`;
          break;
        case textDay <= 90:
          timeAgo = `3 months ago`;
          break;
        case textDay <= 120:
          timeAgo = `4 months ago`;
          break;
        case textDay <= 150:
          timeAgo = `5 months ago`;
          break;
        case textDay <= 180:
          timeAgo = `6 months ago`;
          break;
        case textDay <= 365:
          timeAgo = `1 year ago`;
          break;
        case textDay <= 720:
          timeAgo = `2 years ago`;
          break;
        case textDay <= 1080:
          timeAgo = `3 year ago`;
          break;

        default:
          break;
      }
      return timeAgo;
    }
    return timeAgo;
  }
}

// Post comment function
function postComment(e) {
  state = "addComment";
  e.preventDefault();
  // Check if it is submit button
  if (
    e.target.classList.contains("submitBtn") &&
    state === "addComment" &&
    e.target.innerText === "SEND"
  ) {
    const commentPosted = new Date();
    // textarea
    const textArea = e.target.previousElementSibling.previousElementSibling;
    // comment
    const comment = {
      id: Math.floor(Math.random * 100),
      content: `${textArea.value}`,
      createdAt: `${commentPosted}`,
      incrementedScore: true,
      decrementedScore: false,
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      replies: [],
    };

    // Validate
    if (comment.content === "") {
      alert("Please enter valid comment");
      return;
    } else {
      http
        .post("https://json-server-interactive.herokuapp.com/comments", comment)
        .then(() => {
          getComments();
        })
        .catch((err) => console.log(err));
    }
  }
}

// Post reply function
function postReply(e) {
  e.preventDefault();
  // for replying check if you clicked reply button on comment
  if (
    e.target.classList.contains("replyBtn") &&
    e.target.innerText === "Reply"
  ) {
    const isComment =
      e.target.parentElement.classList.contains("comment-container");
    state = "addReply";
    // Get time of reply
    const replyPosted = new Date();
    // Get id of the comment you are replying to
    const commentId = e.target.parentElement.id;
    // Get user name you are responding to
    const userName = e.target.parentElement.querySelector(
      ".user-info span:nth-child(2)"
    ).innerText;
    // Get next div element of comment you are responding to so you can addText div insert before
    const nextDivEl = e.target.parentElement.nextElementSibling;
    // Get div element with textarea you want to clone
    const addTextDiv = document.getElementsByClassName("add-text")[0];
    // Clone Node
    const cloneAddText = addTextDiv.cloneNode(true);
    // Add margin to the bottom
    cloneAddText.style.marginBottom = "1rem";
    // Add text to textarea
    cloneAddText.firstElementChild.innerText = `@${userName}`;
    // Change text of the clone addText div
    cloneAddText.querySelector("button").innerText = "Reply";
    // Get parent element for inserting before
    main.insertBefore(cloneAddText, nextDivEl);
    // send get request for current user
    let reply;
    http
      .get(
        "https://json-server-interactive.herokuapp.com/currentUser",
        "https://json-server-interactive.herokuapp.com/comments",
        "https://json-server-interactive.herokuapp.com/replies",
        "https://json-server-interactive.herokuapp.com/respondReplies"
      )
      .then((data) => {
        // Submit button on clone add text
        cloneAddText.addEventListener("click", (e) => {
          e.preventDefault();
          state = "addReply";
          if (
            e.target.classList.contains("submitBtn") &&
            state === "addReply"
          ) {
            // get textarea element value
            const textArea = main.querySelector(".add-text #textArea").value;
            // reply comment
            reply = {
              id: Math.floor(Math.random() * 100),
              commentId: commentId,
              content: `${textArea}`,
              createdAt: `${replyPosted}`,
              incrementedScore: true,
              decrementedScore: false,
              score: 0,
              user: {
                image: {
                  png: `${data.dataUser.image.png}`,
                  webp: `${data.dataUser.image.webp}`,
                },
                username: `${data.dataUser.username}`,
              },
              replies: [],
            };
            // Validate
            if (reply.content === `@${userName}`) {
              alert("Please enter your reply.");
              return;
            } else if (isComment) {
              // data.comments.replies.unshift(replyComment);
              http
                .post(
                  `https://json-server-interactive.herokuapp.com/replies`,
                  reply
                )
                .then(() => {
                  getComments();
                })
                .catch((err) => console.log(err));
            } else {
              const { replyId = commentId, ...rest } = reply;
              console.log(replyId);
              reply.replyId = replyId;
              delete reply.commentId;
              http
                .post(
                  `https://json-server-interactive.herokuapp.com/respondReplies`,
                  reply
                )
                .then(() => {
                  getComments();
                })
                .catch((err) => console.log(err));
            }

            // Remove cloneAddText element
            e.target.parentElement.remove();
          }
        });
      })
      .catch((err) => console.log(err));
  }
}

function deleteComment(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    // Clicked delete btn
    const clickedDelete = e.target;
    // Show overlay
    ui.createModalOverlay();
    const overlay = document.querySelector(".overlay");
    // Reject btn
    const rejectBtn = overlay.querySelector(".actionsModal button:first-child");
    // Approve btn
    const approveBtn = overlay.querySelector(".actionsModal button:last-child");
    // Add event listener for reject
    rejectBtn.addEventListener("click", (e) => rejectDelete(e));
    // Add event listener for approve delete comment
    approveBtn.addEventListener("click", (e) =>
      approveDelete(clickedDelete, overlay)
    );
  }
}

function updateComment(e) {
  e.preventDefault();
  if (e.target.classList.contains("edit")) {
    state = "edit";
    // Get id of the comment
    const id = e.target.parentElement.parentElement.id;
    // is it comment or reply
    const isComment =
      e.target.parentElement.parentElement.classList.contains(
        "comment-container"
      );
    // Get Div element of the comment you are editing
    const editDivElement = e.target.parentElement.parentElement;
    // Get text you are editing
    const textAreaContent =
      e.target.parentElement.previousElementSibling.previousElementSibling.querySelector(
        ".comment-text p"
      ).innerText;
    // Get next div element
    const nextDivEl = editDivElement.nextElementSibling;
    // Get div element with text area you want to clone
    const addTextDiv = document.querySelector(".add-text");
    // Clone Node
    const cloneAddTextDiv = addTextDiv.cloneNode(true);
    // Add margin to the bottom
    cloneAddTextDiv.style.marginBottom = "1rem";
    // Change text of clone button to edit
    cloneAddTextDiv.querySelector("button").innerText = "Edit";
    // Add text to textarea you want to edit
    cloneAddTextDiv.querySelector("textarea").value = textAreaContent;
    // Get parent element of section to insert cloned div element
    main.insertBefore(cloneAddTextDiv, nextDivEl);
    // Get data from server for form informations
    let createdAt;
    let user;
    let score;
    let commentId;
    http
      .get(
        "https://json-server-interactive.herokuapp.com/currentUser",
        `https://json-server-interactive.herokuapp.com/comments/${id}`,
        `https://json-server-interactive.herokuapp.com/replies/${id}`,
        "https://json-server-interactive.herokuapp.com/respondReplies"
      )
      .then((data) => {
        user = data.dataUser;
        if (!isComment) {
          createdAt = data.replies.createdAt;
          score = data.replies.score;
          commentId = data.replies.commentId;
        } else {
          createdAt = data.comments.createdAt;
          score = data.comments.score;
        }
      })
      .catch((err) => console.log(err));
    // Add event listener for submit edit
    cloneAddTextDiv.addEventListener("keyup", (e) => {
      // edited comment
      const editedComment = {
        id: id,
        commentId: `${!isComment}` ? `${commentId}` : "",
        content: `${cloneAddTextDiv.querySelector("textarea").value}`,
        createdAt: `${createdAt}`,
        score: `${score}`,
        user: {
          image: {
            png: `${user.image.png}`,
            webp: `${user.image.webp}`,
          },
          username: `${user.username}`,
        },
        replies: [],
      };

      cloneAddTextDiv.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("submitBtn") &&
          !e.target.classList.contains("textArea") &&
          isComment
        ) {
          http
            .put(
              `https://json-server-interactive.herokuapp.com/comments/${id}`,
              editedComment
            )
            .then(() => {
              getComments();
            })
            .catch((err) => console.log(err));
        } else if (
          e.target.classList.contains("submitBtn") &&
          !e.target.classList.contains("textArea") &&
          !isComment
        ) {
          http
            .put(
              `https://json-server-interactive.herokuapp.com/replies/${id}`,
              editedComment
            )
            .then(() => {
              getComments();
            })
            .catch((err) => console.log(err));
        }
      });
    });
  }
}

// Increment score function
function incrementScore(e) {
  e.preventDefault();
  let isComment =
    e.target.parentElement.parentElement.classList.contains(
      "comment-container"
    );
  let isReply =
    e.target.parentElement.parentElement.classList.contains(
      "respond-container"
    ) &&
    !e.target.parentElement.parentElement.classList.contains("respondReplies");
  // comment or reply
  if (isComment) {
    // comment
    // get id
    const commentId = e.target.parentElement.parentElement.id;
    // get data
    http
      .get(
        "https://json-server-interactive.herokuapp.com/currentUser",
        `https://json-server-interactive.herokuapp.com/comments/${commentId}`,
        `https://json-server-interactive.herokuapp.com/replies`,
        "https://json-server-interactive.herokuapp.com/respondReplies"
      )
      .then((data) => {
        let score = +data.comments.score;
        let incrementedScore = data.comments.incrementedScore;
        let decrementedScore = !incrementedScore;
        if (e.target.classList.contains("plusBtn") && incrementedScore) {
          score += 1;
          incrementedScore = false;
          decrementedScore = !incrementedScore;
          const comment = {
            ...data.comments,
            score,
            incrementedScore,
            decrementedScore,
          };
          http
            .put(
              `https://json-server-interactive.herokuapp.com/comments/${commentId}`,
              comment
            )
            .then(() => {
              getComments();
            });
        } else if (
          e.target.classList.contains("minusBtn") &&
          decrementedScore
        ) {
          score -= 1;
          decrementedScore = false;
          incrementedScore = !decrementedScore;
          const comment = {
            ...data.comments,
            score,
            decrementedScore,
            incrementedScore,
          };
          http
            .put(
              `https://json-server-interactive.herokuapp.com/comments/${commentId}`,
              comment
            )
            .then(() => {
              getComments();
            });
        }
      })
      .catch((err) => console.log(err));
  } else if (isReply) {
    // reply
    const replyId = e.target.parentElement.parentElement.id;
    // reply id number
    const replyIdNum = +replyId;
    // Get data from server
    http
      .get(
        "https://json-server-interactive.herokuapp.com/currentUser",
        "https://json-server-interactive.herokuapp.com/comments/",
        `https://json-server-interactive.herokuapp.com/replies/${replyIdNum}`,
        "https://json-server-interactive.herokuapp.com/respondReplies"
      )
      .then((data) => {
        let incrementedScore = data.replies.incrementedScore;
        let decrementedScore = data.replies.decrementedScore;
        let newReply = {};
        if (e.target.classList.contains("plusBtn") && incrementedScore) {
          e.preventDefault();
          incrementedScore = false;
          decrementedScore = !incrementedScore;
          let score = +data.replies.score;
          score += 1;
          newReply = {
            ...data.replies,
            score,
            incrementedScore,
            decrementedScore,
          };

          http
            .put(
              `https://json-server-interactive.herokuapp.com/replies/${replyIdNum}`,
              newReply
            )
            .then(() => {
              getComments();
            });
        } else if (
          e.target.classList.contains("minusBtn") &&
          decrementedScore
        ) {
          let score = +data.replies.score;
          score -= 1;
          decrementedScore = false;
          incrementedScore = !decrementedScore;
          newReply = {
            ...data.replies,
            score,
            incrementedScore,
            decrementedScore,
          };
          http
            .put(
              `https://json-server-interactive.herokuapp.com/replies/${replyIdNum}`,
              newReply
            )
            .then(() => {
              getComments();
            });
        }
      })
      // .then(() => {})
      .catch((err) => console.log(err));
  } else if (!isComment && !isReply) {
    // reply
    const replyId = e.target.parentElement.parentElement.id;
    // reply id number
    const replyIdNum = +replyId;
    // Get data from server
    http
      .get(
        "https://json-server-interactive.herokuapp.com/currentUser",
        "https://json-server-interactive.herokuapp.com/comments/",
        `https://json-server-interactive.herokuapp.com/replies/`,
        `https://json-server-interactive.herokuapp.com/respondReplies/${replyIdNum}`
      )
      .then((data) => {
        let incrementedScore = data.respondReplies.incrementedScore;
        let decrementedScore = data.respondReplies.decrementedScore;
        let newReply = {};
        if (e.target.classList.contains("plusBtn") && incrementedScore) {
          e.preventDefault();
          incrementedScore = false;
          decrementedScore = !incrementedScore;
          let score = +data.respondReplies.score;
          score += 1;
          newReply = {
            ...data.respondReplies,
            score,
            incrementedScore,
            decrementedScore,
          };

          http
            .put(
              `https://json-server-interactive.herokuapp.com/respondReplies/${replyIdNum}`,
              newReply
            )
            .then(() => {
              getComments();
            });
        } else if (
          e.target.classList.contains("minusBtn") &&
          decrementedScore
        ) {
          let score = +data.respondReplies.score;
          score -= 1;
          decrementedScore = false;
          incrementedScore = !decrementedScore;
          newReply = {
            ...data.respondReplies,
            score,
            incrementedScore,
            decrementedScore,
          };
          http
            .put(
              `https://json-server-interactive.herokuapp.com/respondReplies/${replyIdNum}`,
              newReply
            )
            .then(() => {
              getComments();
            });
        }
      })
      .catch((err) => console.log(err));
  }
}

function rejectDelete(e) {
  e.target.parentElement.parentElement.parentElement.remove();
}

function approveDelete(clickedDelete, overlay) {
  // e.target.parentElement.parentElement.remove();
  const id = clickedDelete.parentElement.parentElement.id;
  // Remove overlay
  overlay.remove();
  if (
    clickedDelete.parentElement.parentElement.classList.contains(
      "comment-container"
    )
  ) {
    http
      .delete(`https://json-server-interactive.herokuapp.com/comments/${id}`)
      .then((data) => {
        getComments();
      })
      .catch((err) => console.log(err));
  } else if (
    clickedDelete.parentElement.parentElement.classList.contains(
      "respond-container"
    ) &&
    !clickedDelete.parentElement.parentElement.classList.contains(
      "respondReplies"
    )
  ) {
    const idNum = +id;
    http
      .delete(`https://json-server-interactive.herokuapp.com/replies/${idNum}`)
      .then(() => {
        getComments();
      })
      .catch((err) => console.log(err));
  } else if (
    clickedDelete.parentElement.parentElement.classList.contains(
      "respondReplies"
    )
  ) {
    const idNum = +id;
    http
      .delete(
        `https://json-server-interactive.herokuapp.com/respondReplies/${idNum}`
      )
      .then(() => {
        getComments();
      })
      .catch((err) => console.log(err));
  }
}
