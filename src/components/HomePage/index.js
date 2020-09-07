import React, { useState } from 'react';
import './style.css';
import initialPostData from "../data/postdata.json";

const initialFormState = { id: '', name: '', description: '', email: '', replys: null }

function HomePage() {
  const [Posts, setPost] = useState(initialPostData);
  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setStateModal] = useState("none");
  const [filterKey, setFilter] = useState(null);
  const [replier, setReplier] = useState(null);


  function newId(){
    return (Math.random() * (100));
  }


  function createPost(){
      var listPosts = Posts;

      formData["id"] = newId().toString();
      if(replier){
        listPosts = Posts.filter((data)=>{
            if(data.id.includes(replier.id)){
                if(!data.replys){
                    data["replys"] = [formData];
                }else{
                    data.replys.push(formData);
                }
                return data;
            }else{
                return data
            }
          });
      }else{
        listPosts.push(formData);
      }
      setFormData(initialFormState);
      setPost(listPosts);
      setStateModal("none");
      setReplier(null);
  }

  function findPost(event) {
    if(event){
        var keyword = event.target.value;
        setFilter(keyword);
    }
  }

  function deletePost(postId){
    var listPosts = Posts;
    listPosts = Posts.filter((data)=>{
        if(data.id.includes(postId)){
            return null;
        }else {
            if(data.replys){
                var replys = data.replys.filter((reply)=>{
                    if(reply.id.includes(postId)){
                        return null;
                    }else{
                        return reply;
                    }
                });
                data.replys = replys;
                return data;
            }else{
                return data;
            }
        }
    });
    setPost(listPosts);
  }

    function replyPost(repliedPost){
        setReplier(repliedPost);
        setStateModal('block');
    }

  function showPost(post, repliedId){
      return (
        <div key={post.id}>
            <div  className="post">
                <p>&quot;{post.description}&quot;</p>
                <div className="post-author" >
                    Author: {post.name} email: {post.email}
                </div>
                {(!repliedId) && (
                        <span 
                            onClick={() => {
                                replyPost(post)
                            }}>
                            &larr;Reply
                        </span>
                    
                )}
                &nbsp;
                <span 
                    onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')) { deletePost(post.id) }
                    }}>
                    &times;Delete
                </span>
                
                {(post.replys) &&
                    (<div className="post-reply" 
                        style={{marginBottom: 30, margin:10, maxHeight:'300px', minHeight: '100px', overflowY: 'scroll' }}>
                        <label >Replied
                        {
                            post.replys.map(reply => showPost(reply, post.id))
                        }
                        </label>
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
                <button 
                    className="close" 
                    tabIndex={5}
                    onClick={() => {
                        setStateModal("none");
                        setReplier(null);
                        }}
                    onChange={() => {
                        setStateModal("none");
                        setReplier(null);
                        }}
                  >
                    &times;
                </button>
                <input
                    aria-label={"author"}
                    aria-required="true"
                    tabIndex={1}
                    name="author"
                    autoFocus={true}
                    onChange={e => setFormData({ ...formData, 'name': e.target.value})}
                    placeholder="Name"
                    className="textinput" 
                    value={formData.name}
                />
                <input
                    aria-label={"author e-mail"}
                    tabIndex={2}
                    aria-required="true"
                    className="textinput" 
                    onChange={e => setFormData({ ...formData, 'email': e.target.value})}
                    placeholder="e-mail"
                    value={formData.email}
                />
                <textarea 
                    aria-label={"post description"}
                    aria-required="true"
                    tabIndex={3}
                    className="textinput" 
                    onChange={e => setFormData({ ...formData, 'description': e.target.value})}
                    placeholder="Post description"
                    value={formData.description}
                />
                <button 
                    className="btn"
                    tabIndex={4}
                    aria-label={"Button Create Post"}
                    onClick={createPost}>
                        Create Post
                </button>
              </div>
            </div>      
            <input type="text" 
                placeholder="Enter keyword to be searched Inspiring Quotes" 
                aria-label={"Search bar"}
                style={{     
                    float: 'left',
                    width:'50%',}} 
                    onChange={(e)=> findPost(e)} 
                    onBlur={(e)=> findPost(e)} />
            <button 
                aria-label={"Add new Inspiring Quotes"}
                onClick={() => {setStateModal("block"); }}>
                    Add new Inspiring Quotes
            </button>
            <div className="post-container"
                style={{marginBottom: 30, margin: 5, maxHeight:'500px', minHeight: '300px', overflowY: 'scroll' }}>
                <label                 
                    aria-label={"Inspiring Quotes"}
                    tabIndex="4"
                 style={ { width:'100%'}}>Inspiring Quotes
                    <React.Fragment>
                        {
                            Posts.filter((data)=>{
                                if(filterKey == null)
                                    return data
                                else if(data.name.includes(filterKey) || data.email.includes(filterKey) || data.description.includes(filterKey)){
                                    return data
                                }else{
                                    return null
                                }
                              }).map(post => showPost(post))
                        }
                    </React.Fragment>
                </label>
            </div>
        </div>
    </div>
  );
}

export default HomePage;