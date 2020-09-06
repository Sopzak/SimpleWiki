import React, { useState } from 'react';
import './style.css';
import initialPostData from "../data/postdata.json"

const initialFormState = { id: '', name: '', description: '', email: '' }

function HomePage() {
  const [Posts, setPost] = useState(initialPostData);
  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setStateModal] = useState("none");

  function createPost(){
      var listPosts = Posts;
      listPosts.push(formData);
      setFormData(initialFormState);
      setPost(listPosts);
      setStateModal("none");
  }

  function deletePost(postId){
    console.log(postId);
  }

  function replayPost(postId){
    console.log(postId);
  }

  function showPost(post){
      return (
        <div key={post.id}>
            <div className="post-container">
                <p>{post.description}</p>
                <div >
                    Author: {post.name} {post.email}
                </div>
                <button onClick={replayPost(post.id)}>Replay</button>
                <button onClick={deletePost(post.id)} >Delete</button>
                
                {(post.replays) &&
                    (<div style={{marginBottom: 30, maxHeight:'300px', minHeight: '100px', overflowY: 'scroll' }}>
                        {
                            post.replays.map(replay => showPost(replay))
                        }
                    </div>
                    )
                }
            </div>
        </div>
    )
  }

  return (
    <div className="home-page">
        <div className="container">
            <div className="modal" style={{display: showModal}}>
              <div className="modal-content">
                <span 
                  className="close" 
                  onClick={() => {setStateModal("none");}}>
                    &times;
                </span>
                <input
                    aria-label={"name"}
                    aria-required="true"
                    onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                    placeholder="Name"
                    className="textinput" 
                    value={formData.name}
                />
                <input
                    aria-label={"e-mail"}
                    aria-required="true"
                    className="textinput" 
                    onChange={e => setFormData({ ...formData, 'email': e.target.value})}
                    placeholder="e-mail"
                    value={formData.email}
                />
                <textarea 
                    aria-label={"Post description"}
                    aria-required="true"
                    className="textinput" 
                    onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                    placeholder="Post description"
                    value={formData.description}
                />
                <button 
                    className="btn"
                    aria-label={"Create Post"}
                    onClick={createPost}>
                        Create Post
                </button>
              </div>
            </div>
            <button 
                aria-label={"Add Post"}
                onClick={() => {setStateModal("block");}}>
                    Add Post
            </button>
            <div style={{marginBottom: 30, maxHeight:'500px', minHeight: '300px', overflowY: 'scroll' }}>
                {
                    Posts.map(post => showPost(post))
                }
            </div>
        </div>
    </div>
  );
}

export default HomePage;