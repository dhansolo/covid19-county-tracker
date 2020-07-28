import React from 'react';

class NotFound extends React.Component {
    render() {
        return (
            <div class="info">
                <p>
                No data found, are you sure you entered the correct County and State?
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