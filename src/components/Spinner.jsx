const Spinner = () =>
    {
        return(
            <div className="loadingSpinnerContainer"  data-testid="spinner-container">
                <div className="loadingSpinner" data-testid="inner-container"/>
            </div>
        )
    }
    
    export default Spinner