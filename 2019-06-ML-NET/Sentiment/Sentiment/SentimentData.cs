namespace Sentiment
{
    using Microsoft.ML.Data;

    // The input dataset has a string for the text being analyzed
    // and a boolean for the positive status of the text sentiment
    // LoadColumn defines the field order in the data file
    // Sentiment has an additional ColumnName property to designate
    // it as the Label
    // The Label is used to create and train the model
    // Also used to split the data
    public class SentimentData
    {
        [LoadColumn(0)]
        public string SentimentText;

        [LoadColumn(1), ColumnName("Label")]
        public bool Sentiment;
    }

    // This class is used post model training and inherits from
    // SentimentData to display the text along with the predictions
    public class SentimentPrediction : SentimentData
    {

        [ColumnName("PredictedLabel")]
        public bool Prediction { get; set; }

        public float Probability { get; set; }

        public float Score { get; set; }
    }
}
