function init() {
  buildMenu();
  buildContent();
}

function buildMenu() {
  // Horatiu & Malina
  const menu = $("<div>", "</div>");
  menu.addClass("menu");
  $("#container").append(menu);
}

//aray with posts
let posts = [
  {
    text: "LALALALAL LALLALALAL LAAAAAAAAAAAAAAAAAAA",
    comments: {
      user: "user1",
      comment: "Nice",
    },
    thisUserPost: true,
  },
  {
    text:
      "LALALALAL LALLAaaaaaaaaaaaaaaaaaaaaaaaaALAL LAAAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAAAAA",
    comments: [
      {
        user: "user2",
        comment: "Bad",
      },
    ],
    thisUserPost: false,
  },
];
//create content
const content = $("<div>", "</div>");
content.addClass("content");
content.attr("id", "content");

function buildContent() {
  //add a new post
  const addPost = $("<div>", "</div>");
  addPost.addClass("add-post");

  const inputPost = $("<input>", "</input>");
  inputPost.attr("placeholder", "Write a new post :");

  const addPostBtn = $("<button>", "</button>");
  addPostBtn.text("Add");
  addPostBtn.on("click", () => {
    console.log("Post added !");
  });

  addPost.append(inputPost, addPostBtn);

  content.append(addPost);

  getAllPosts();
  renderPostsList();
  $("#container").append(content);
}

function getAllPosts() {
  // get posts from database
}

const postsList = $("<ul>", "</ul>");
postsList.addClass("posts-list");

function renderPostsList() {
  //create new list element for every post
  for (let i = 0; i < posts.length; i++) {
    postsList.append(createNewPost(posts[i]));
  }
  console.log(postsList);
  content.append(postsList);
}

function createNewPost(post) {
  const liElement = $("<li>", "</li>");
  liElement.addClass("post-element");

  const postText = $("<p>", "</p>");
  postText.addClass("text-post");
  postText.text(post.text);

  if (post.thisUserPost == true) { //if is the post of the active user
    const crudBtn = $("<button>", "</button>");
    crudBtn.addClass("fas fa-ellipsis-v");

    crudBtn.addClass("close");

    //create operations crud
    const crudOperations = $("<div>", "</div>");
    crudOperations.addClass("crud-operations");
    crudOperations.attr("id", "crud-operations");

    //update post
    const updatePost = $("<p>", "</p>");
    updatePost.text("Update post");
    updatePost.addClass("crud-option");
    updatePost.on("click", () => {
      const updatePopup = $("<div>", "</div>");
      updatePopup.addClass("update-popup");
      updatePopup.attr("id", "update-popup");

      const updateDiv = $("<div>", "</div>");
      updateDiv.addClass("update-div");
      updateDiv.attr("id","update-div");

      const message = $("<p>", "</p>");
      message.text("Type here the updated post :");

      const newPostInput = $("<input>", "</input>");

      const btnUpdate = $("<button>", "</button>");
      btnUpdate.text("Update");
      btnUpdate.on("click", () => {
        //update post in the database
        console.log("Post updated 2");
      });

      const closeBtn = $("<button>", "</button>");
      closeBtn.addClass("fas fa-times");
      closeBtn.on("click", () => {
        //close update option and DO NOT update post
        $("#update-div").remove();
        $("#update-popup").remove();
      });
      updateDiv.append(message, newPostInput, btnUpdate, closeBtn);

      $("#container").append(updatePopup);
      $("#container").append(updateDiv);
    });

    //delete operation
    const deletePost = $("<p>", "</p>");
    deletePost.text("Delete post");
    deletePost.addClass("crud-option");
    deletePost.on("click", () => {
      console.log("post deleted !");

      const deletePopup = $("<div>", "</div>");
      deletePopup.addClass("delete-popup");
      deletePopup.attr("id", "delete-popup");

      const deleteDiv = $("<div>", "</div>");
      deleteDiv.addClass("delete-div");
      deleteDiv.attr("id","delete-div");

      const message = $("<p>", "</p>");
      message.text("Are you sure you want to delete this post ?");

      const btnYes = $("<button>", "</button>");
      btnYes.text("Yes");
      btnYes.on("click", () => {
        //delete post from the database
        $("#delete-div").remove();
        $("#delete-popup").remove();
      });

      const btnNo = $("<button>", "</button>");
      btnNo.text("No");
      btnNo.on("click", () => {
        // do NOT delete post from the database
        $("#delete-div").remove();
        $("#delete-popup").remove();
      });
      deleteDiv.append(message, btnYes, btnNo);

      $("#container").append(deletePopup);
      $("#container").append(deleteDiv);
    });

    crudOperations.append(updatePost, deletePost);

    // open/close CRUD options
    let clicks = 0;
    crudBtn.on("click", function () {
      if (clicks == 0) {
        $("#crud-operations").show();
        clicks = 1;
      } else {
        $("#crud-operations").hide();
        clicks = 0;
      }
    });

    liElement.append(postText, crudBtn, crudOperations);
  } else {
    const inputComm = $("<input>", "</input>");
    inputComm.addClass("input-comm");

    const btnAddComm = $("<button>", "</button>");
    btnAddComm.addClass("btn-comm");
    btnAddComm.text("Add comment");
    btnAddComm.on("click", () => {
      //add a new comment
    });

    const divPostDetailsBtn = $("<div>", "</div>");
    divPostDetailsBtn.addClass("details-btn");

    const btnAllComm = $("<button>", "</button>");
    btnAllComm.addClass("far fa-comment");
    btnAllComm.on("click", () => {
      //show all comments
    });

    const likeBtn = $("<button>", "</button>");
    likeBtn.addClass("far fa-thumbs-up");
    likeBtn.on("click", () => {
      //like a post
    });

    const savePostBtn = $("<button>", "</button>");
    savePostBtn.addClass("far fa-bookmark");
    savePostBtn.on("click", () => {
      //save a post
    });

    divPostDetailsBtn.append(savePostBtn, likeBtn, btnAllComm);

    liElement.append(postText, inputComm, btnAddComm, divPostDetailsBtn);
  }

  return liElement;
}
window.onload = init;
