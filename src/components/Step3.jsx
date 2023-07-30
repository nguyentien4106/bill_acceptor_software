import React, { PureComponent } from 'react'

class Step3 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: [],
            videoRef: React.useRef()
        }
    }

    handleSnapshot(){
        if(!videoRef.current.srcObject){
            return
          }
      
          const canvas = document.createElement('canvas');
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
          const dataURI = canvas.toDataURL('image/jpg');
      
          if(images.length < 6){
            this.setState([...images, dataURI])
            props.onSetImagesTaken([...images, dataURI])
          }
          else {
            Store.removeAllNotifications()
            Store.addNotification({
              title: "",
              id: "maxPhoto",
              message: "Bạn chỉ có thể chụp tối đa 6 hình !",
              type: "danger",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 2500,
                onScreen: true
              }
            })
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          }
    }

    render() {
        return (
            <>
            <div className='d-flex w-100 justify-content-around align-items-around'> 
              <div className='d-flex flex-column w-50 justify-content-center w-75 align-items-center'>
                <div className='video-container mt-5 mb-5 d-flex'>
                  <video className='video justify-content-center' ref={this.state.videoRef} autoPlay={true}/>
                </div>
              </div>
              <div className='d-flex w-50'>
                <div className='d-flex flex-column m-5'>
                  {
                    this.state.images && this.state.images.map((item, index) => {
                      if(index < 3){
                        return <img key={index} className='image-taken' src={item}></img>
                      }
                    })
                  }
                </div>
                <div className='d-flex flex-column m-5'>
                  {
                    this.state.images && this.state.images.map((item, index) => {
                      if(index >= 3){
                        return <img key={index} className='image-taken' src={item}></img>
                      }
                    })
                  }
                </div>
                
              </div>
        
              
            </div>
            <div className='button'>
              
            <i className="bi bi-camera fa-10x mt-5 pointer button h1" onClick={handleSnapshot}></i>
          </div>
          </>
        )
    }
}

export default Step3