import React from "react"
import { S3Album, S3Image } from 'aws-amplify-react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class AllScreenView extends React.Component {


    constructor(props) {
        super(props);
        this.state = { modalOpen: false, requirementKey: new Date(), count: 0 };
        this.imageView = React.createRef();
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState(({ count }) => ({ count: count + 1 }));
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleSelect(e) {
        console.log(e);
        let email = e.key.split("/")[1];
        let fullSizeKey = "fullsize/" + e.key.split("/")[1] + "/" + e.key.split("/")[2];
        this.setState({ fullSizeKey, email });
        this.setState({ modalOpen: true });
    }

    handleClose = () => this.setState({ modalOpen: false })

    render() {
        let imageStyle = {
            "max-width": "80%",
            "max-height": "80%"
        };
        return (
            <div>
                <S3Album 
                   level="public" 
                   select onSelect={(e)=>this.handleSelect(e)}
                   path={'resized/'} 
                   key={this.state.count}
                />
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    closeIcon
                    size='fullscreen'
                >
                    <Header icon='browser' content={this.state.email} />
                    <Modal.Content>
                        <S3Image 
                            level="public" 
                            imgKey={this.state.fullSizeKey} 
                            style={imageStyle}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                      <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Close it
                      </Button>
                    </Modal.Actions>
                </Modal>
           </div>
        );
    }
}
