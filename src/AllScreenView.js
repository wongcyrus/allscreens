import React from "react"
import { Storage } from 'aws-amplify';
import { S3Album, S3Image } from 'aws-amplify-react';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'

export default class AllScreenView extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            count: 0,
            referesh: false,
            searchKeyword: undefined
        };
        this.search = React.createRef();
        this.s3Album = React.createRef();
    }

    async componentDidMount() {
        this.interval = setInterval(() => {
            if (this.state.referesh)
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

    toggleRefresh() {
        this.setState(({ referesh }) => ({ referesh: !referesh }));
    }

    handleClose = () => this.setState({ modalOpen: false })

    filter = item => {
        console.log(this.state.searchKeyword);

        if (this.state.searchKeyword) {
            const regex = new RegExp(`${this.state.searchKeyword}`, "i");
            return item.filter(item => regex.test(item.key));
        }
        return item;
    }

    sort = item => {
        const compare = (a, b) => {
            if (a.key < b.key) {
                return -1;
            }
            if (a.key > b.key) {
                return 1;
            }
            return 0;
        };
        return item.sort(compare);
    }

    handleSearch = (event) => {
        console.log(event.target.value);
        this.setState({ searchKeyword: event.target.value });
        this.setState(({ count }) => ({ count: count + 1 }));
    }

    clearAllScreenshots = async (event) => {
        const result = await Storage.list('resized/');
        console.log(result);
        result.map(c=> Storage.remove(c.key));
    }

    render() {
        let imageStyle = {
            maxWidth: "80%",
            maxHeight: "80%"
        };
        return (
            <div className="table">
                <button disabled = {(this.state.referesh)? "disabled" : ""} onClick={() => this.toggleRefresh()}>Start Auto-refresh.</button>
                <button disabled = {(!this.state.referesh)? "disabled" : ""} onClick={() => this.toggleRefresh()}>Stop Auto-refresh.</button>
                <Input ref={this.search} icon='search' placeholder='Search...' onChange={(event)=>this.handleSearch(event)}/>
                <button onClick={() => this.clearAllScreenshots()}>Delete all previous screenshots.</button>
                <S3Album 
                    ref={this.s3Album}
                    level="public"
                    select 
                    onSelect={(e)=>this.handleSelect(e)}
                    path={'resized/'} 
                    key={this.state.count}
                    filter={(item)=>this.filter(item)}
                    sort={(item)=>this.sort(item)}
                />
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
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
