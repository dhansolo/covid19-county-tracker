import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div className="info">
                <p>
                No data found
                </p>
                <p>
                Please note that data from John Hopkins University may contain some
                discrepencies.
                </p>
            </div>
        )
    }
}

export default NotFound;