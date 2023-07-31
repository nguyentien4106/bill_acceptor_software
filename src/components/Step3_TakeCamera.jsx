import React, { Component } from 'react'
import { Store } from 'react-notifications-component';

class Step3_TakeCamera extends Component {
    constructor(props) {
        super(props)

        this.state = {
            images: [],
            videoRef: React.createRef()
        }
        this.handleSnapshot = this.handleSnapshot.bind(this)
    }

    handleSnapshot(){
      console.log(this.state)
        if(!this.state.videoRef.current.srcObject){
            return
          }
      
          const canvas = document.createElement('canvas');
          canvas.width = this.state.videoRef.current.videoWidth;
          canvas.height = this.state.videoRef.current.videoHeight;
          canvas.getContext('2d').drawImage(this.state.videoRef.current, 0, 0, canvas.width, canvas.height);
      
          const dataURI = canvas.toDataURL('image/jpg');
      
          if(this.state.images.length < 6){
            this.setState({images: [...this.state.images, dataURI]})
            this.props.onSetImagesTaken([...this.state.images, dataURI])
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
            this.state.videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          }
    }

    isValidated(){
      const isValid = this.state.images.length === 6;
      if(!isValid){
        Store.addNotification({
          id: "notifyenoughImage",
          message: "Hãy chụp đủ 6 tấm hình đã bạn nhé !",
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        })
      }
      return this.state.images.length === 6;
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
              
            <i className="bi bi-camera fa-10x mt-5 pointer button h1" onClick={this.handleSnapshot}></i>
          </div>
          </>
        )
    }
}

export default Step3_TakeCamera