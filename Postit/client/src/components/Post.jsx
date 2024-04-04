import { Link } from "react-router-dom";

const Card = (props) => {
    
    return (
      //move this jsx to a card component where we pass in some props and it returns a completed card
      <div className="panel blog-container mb-4">
        <div className="panel-body">
          <div className="image-wrapper">
            <a className="image-wrapper image-zoom cboxElement" href="#">
              <img 
              className="card-img-top" 
              data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
              alt="Thumbnail [100%x225]" 
              style={{height: 400, width: '100%', display: 'block'}}
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
              //src= {props.data.logo} 
              data-holder-rendered="true" />
              <div className="image-overlay"></div> 
            </a>
          </div>
          <h4 className="mt-2 ml-2">{props.data.title}</h4>
          <small className="text-muted ml-2">By <a href="#"><strong> John Doe</strong></a> |  Post on Jan 8, 2013  | 58 comments</small>
          
          <p className="m-top-sm m-bottom-sm ml-2">
            {props.data.content}
          </p>
          <div className="btn-group mb-2 ml-2">
            <Link type="button" to="/posts/view" state={{postData: props.data}} className="btn btn-sm btn-outline-secondary">View</Link>
            <Link type="button" to="/posts/edit" state={{postData: props.data}} className="btn btn-sm btn-outline-secondary">Edit</Link>
            <Link type="button" to="/posts/delete" state={{postData: props.data}} className="btn btn-sm btn-outline-secondary">Delete</Link>
          </div>
            <span className="post-like text-muted tooltip-test" data-toggle="tooltip" data-original-title="I like this post!">
              <i className="fa fa-heart mr-1"></i> <span className="like-count mr-2">25</span>
            </span>            
          </div> 
    </div>
    );
}
 
export default Card;


/*
<div className="panel blog-container mb-4">
        <div className="panel-body">
          <div className="image-wrapper">
            <a className="image-wrapper image-zoom cboxElement" href="#">
              <img 
              className="card-img-top" 
              data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
              alt="Thumbnail [100%x225]" 
              style={{height: 400, width: '100%', display: 'block'}}
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22382%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20382%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16e231e5e51%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A19pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16e231e5e51%22%3E%3Crect%20width%3D%22382%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22126.96875%22%20y%3D%22120.9%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" 
              //src= {props.data.logo} 
              data-holder-rendered="true" />
              <div className="image-overlay"></div> 
            </a>
          </div>
          <h4 className="mt-2">{props.data.name}</h4>
          <small className="text-muted">By <a href="#"><strong> John Doe</strong></a> |  Post on Jan 8, 2013  | 58 comments</small>
          
          <p className="m-top-sm m-bottom-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros nibh, viverra a dui a, gravida varius velit. Nunc vel tempor nisi. Aenean id pellentesque mi, non placerat mi. Integer luctus accumsan tellus. Vivamus quis elit sit amet nibh lacinia suscipit eu quis purus. Vivamus tristique est non ipsum dapibus lacinia sed nec metus.
          </p>
          <div className="btn-group mb-2">
              <Link type="button" to="/posts" state={{postsData: props}} className="btn btn-sm btn-outline-secondary">View Posts</Link>
              <Link type="button" to="/subpostit/edit" state={{postsData: props}} className="btn btn-sm btn-outline-secondary">Edit</Link>
              <Link type="button" to="/subpostit/delete" state={{postsData: props}} className="btn btn-sm btn-outline-secondary">Delete</Link>
          </div>
            <span className="post-like text-muted tooltip-test" data-toggle="tooltip" data-original-title="I like this post!">
              <i className="fa fa-heart"></i> <span className="like-count">25</span>
            </span>            
          </div> 
    </div>
*/