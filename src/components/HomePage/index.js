import React, { useState } from 'react';
import './style.css';
import initialPostData from "../data/postdata.json";

const initialFormState = { id: '', name: '', description: '', email: '', replys: null }

function HomePage() {
  const [Posts, setPost] = useState(initialPostData);
  const [FiltredPost, setFiltredPost] = useState(Posts);
  const [formData, setFormData] = useState(initialFormState);
  const [showModal, setStateModal] = useState("none");
  const [filterKey, setFilter] = useState(null);
  const [replier, setReplier] = useState(null);

  function createPost(){
      var listPosts = Posts;
      var min = 1;
      var max = 100;
      var rand =  min + (Math.random() * (max-min));

      formData["id"] = rand.toString();
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
      loadList();
      setStateModal("none");
      setReplier(null);
  }

  function findPost(event) {
    if(event){
        var keyword = event.target.value;
        setFilter(keyword);
    }
    loadList();
  }

  function loadList(){
    var listPost = Posts.filter((data)=>{
        if(filterKey == null)
            return data
        else if(data.name.includes(filterKey) || data.email.includes(filterKey) || data.description.includes(filterKey)){
            return data
        }else{
            return null
        }
      });
      setFiltredPost(listPost);
  }

  function deletePost(postId){
    console.log(postId);
    var listPosts = Posts;
    listPosts = Posts.filter((data)=>{
        if(data.id.includes(postId)){
            return null;
        }else {
            return data
        }
    });
    console.log(Posts.length + " - " + listPosts.length)
    setPost(listPosts);
    loadList();
  }

  function replyPost(repliedPost){
    setReplier(repliedPost);
    setStateModal('block');
  }

  function showPost(post, repliedId){
      return (
        <div key={post.id}>
            <div style={{margin:5}} className="post">
                <p>&quot;{post.description}&quot;</p>
                <div className="post-author" >
                    Author: {post.name} email: {post.email}
                </div>
                <span 
                    onClick={() => {
                        replyPost(post.id)
                    }}>
                    &times;
                </span>
                <span 
                    onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')) { deletePost(post.id) }
                    }}>
                    &times;D
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
                <span 
                  className="close" 
                  onClick={() => {
                      setStateModal("none");
                      setReplier(null);
                  }}>
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
            <input type="text" placeholder="Enter keyword to be searched" 
                style={{      
                    border:'solid',
                    borderRadius:'10px',
                    position:'relative',
                    height:'3vh',
                    left: '5vh',
                    float: 'left',
                    width:'50%',}} 
                    onChange={(e)=> findPost(e)} 
                    onBlur={(e)=> findPost(e)} />
            <button 
                aria-label={"Add Post"}
                onClick={() => {setStateModal("block");}}>
                    Add Post
            </button>
            <div className="post-container"
                style={{marginBottom: 30, margin: 5, maxHeight:'500px', minHeight: '300px', overflowY: 'scroll' }}>
                <label style={ { width:'100%'}}>Inspiring Quotes
                    <React.Fragment>
                        {
                            FiltredPost.map(post => showPost(post))
                        }
                    </React.Fragment>
                    
                </label>
            </div>
        </div>
    </div>
  );
}

export default HomePage;