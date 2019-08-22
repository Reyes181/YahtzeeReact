import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import GameRules from './GameRules';

class MobileRules extends Component {
    
    render() {
        return (
            <Dialog onClose={this.props.onClose} open={this.props.open}>
                <GameRules/>
            </Dialog>
        )
    }
}

export default MobileRules;