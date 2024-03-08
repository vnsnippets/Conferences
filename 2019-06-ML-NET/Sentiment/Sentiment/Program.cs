namespace Sentiment
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using Microsoft.ML;
    using Microsoft.ML.Data;
    using static Microsoft.ML.DataOperationsCatalog;
    using Microsoft.ML.Trainers;
    using Microsoft.ML.Transforms.Text;

    public class Program
    {
        static readonly string _dataPath = Path.Combine(Environment.CurrentDirectory, "Data", "yelp_labelled.txt");
        static readonly string _modelPath = Path.Combine(Environment.CurrentDirectory, "Data", "Model.zip");

        static void Main(string[] args)
        {
            // 1. Everything starts with an ML Context
            MLContext Context = new MLContext();

            // 2. Load text data
            IDataView data = LoadData(Context);

            // 3. Split into training and evaluation
            TrainTestData splitDataView = SplitData(Context, data);

            // 4. Build and Train the model
            ITransformer model = BuildAndTrainModel(Context, splitDataView.TrainSet);

            // 5. Evaluate the model
            Evaluate(Context, model, splitDataView.TestSet);

            // 6. Test Prediction (Single)
            UseModelWithSingleItem(Context, model);

            // 7. Test Prediction (Batch)
            UseModelWithBatchItems(Context, model);

            // Optional: Save model as ZIP
            Context.Model.Save(model, data.Schema, "model.zip");

            Console.ReadKey();
        }

        // Loads the data.
        public static IDataView LoadData(MLContext mlContext)
        {
            IDataView dataView = mlContext.Data.LoadFromTextFile<SentimentData>(_dataPath, hasHeader: false);

            return dataView;
        }

        // Splits the loaded dataset into train and test datasets.
        // Returns the split train and test datasets.
        public static TrainTestData SplitData(MLContext mlContext, IDataView data)
        {
            TrainTestData splitDataView = mlContext.Data.TrainTestSplit(data, testFraction: 0.2);
            return splitDataView;
        }

        // Extracts and transforms the data.
        // Trains the model.
        // Predicts sentiment based on test data.
        // Returns the model.
        public static ITransformer BuildAndTrainModel(MLContext mlContext, IDataView trainSet)
        {
            // Featurization converts the text column (Sentiment Text) into
            // a numeric key type (Features) to be used by the algorithm

            // Learning algorithm : Binary Classification (Positive or Negative)
            // The "Learning Task" is appended to the data transformation

            var estimator = mlContext.Transforms.Text.FeaturizeText(outputColumnName: "Features", inputColumnName: nameof(SentimentData.SentimentText))
                .Append(mlContext.BinaryClassification.Trainers.SdcaLogisticRegression(labelColumnName: "Label", featureColumnName: "Features"));

            // Training
            Console.WriteLine("= CREATING AND TRAINING THE MODEL =");
            var model = estimator.Fit(trainSet);
            Console.WriteLine("= END OF TRAINING =");
            Console.WriteLine();

            return model;
        }

        // Loads the test dataset.
        // Creates the BinaryClassification evaluator.
        // Evaluates the model and creates metrics.
        // Displays the metrics.
        public static void Evaluate(MLContext mlContext, ITransformer model, IDataView splitTestSet)
        {
            // Creates a prediction set
            Console.WriteLine("= EVALUATING MODEL ACCURACY =");
            IDataView predictions = model.Transform(splitTestSet);

            // Compare with LABEL
            CalibratedBinaryClassificationMetrics metrics = mlContext.BinaryClassification.Evaluate(predictions, "Label");

            // Logging
            // The Accuracy metric gets the accuracy of a model,
            // which is the proportion of correct predictions in the test set.

            // The AreaUnderRocCurve metric indicates how confident the model is correctly
            // classifying the positive and negative classes.
            // You want the AreaUnderRocCurve to be as close to one as possible.

            //The F1Score metric gets the model's F1 score, which is a measure of balance 
            // between precision and recall.
            // You want the F1Score to be as close to one as possible.

            Console.WriteLine();
            Console.WriteLine("= MODEL QUALITY METRICS EVALUATION =");
            Console.WriteLine("--------------------------------");
            Console.WriteLine($"ACCURACY: {metrics.Accuracy:P2}");
            Console.WriteLine($"AUC: {metrics.AreaUnderRocCurve:P2}");
            Console.WriteLine($"F1SCORE: {metrics.F1Score:P2}");
            Console.WriteLine("= END OF EVALUATION =");
        }

        // Creates a single comment of test data.
        // Predicts sentiment based on test data.
        // Combines test data and predictions for reporting.
        // Displays the predicted results.
        private static void UseModelWithSingleItem(MLContext mlContext, ITransformer model)
        {
            //The PredictionEngine is a convenience API, which allows you to pass in 
            // and then perform a prediction on a single instance of data.
            PredictionEngine<SentimentData, SentimentPrediction> predictionFunction = mlContext.Model.CreatePredictionEngine<SentimentData, SentimentPrediction>(model);

            SentimentData sampleStatement = new SentimentData
            {
                SentimentText = "I don't like this speaker but the presentation is awesome"
            };

            var resultprediction = predictionFunction.Predict(sampleStatement);

            Console.WriteLine();
            Console.WriteLine("= MODEL PREDICTION TEST =");

            Console.WriteLine();
            Console.WriteLine(
                $"SENTIMENT: {resultprediction.SentimentText} \n" +
                $"PREDICTION: {(Convert.ToBoolean(resultprediction.Prediction) ? "POSITIVE" : "NEGATIVE")} \n" +
                $"PROBABILITY: {resultprediction.Probability} ");

            Console.WriteLine("= END OF PREDICTION TEST =");
            Console.WriteLine();
        }

        // Creates batch test data.
        // Predicts sentiment based on test data.
        // Combines test data and predictions for reporting.
        // Displays the predicted results.
        public static void UseModelWithBatchItems(MLContext mlContext, ITransformer model)
        {
            IEnumerable<SentimentData> sentiments = new[]
            {
                new SentimentData
                {
                    SentimentText = "This was a horrible meal"
                },
                new SentimentData
                {
                    SentimentText = "I love this spaghetti."
                }
            };

            IDataView batchComments = mlContext.Data.LoadFromEnumerable(sentiments);

            IDataView predictions = model.Transform(batchComments);

            // Use model to test sentiment of text
            IEnumerable<SentimentPrediction> predictedResults = mlContext.Data.CreateEnumerable<SentimentPrediction>(predictions, reuseRowObject: false);

            Console.WriteLine();

            Console.WriteLine("= PREDICTION TEST OF MODEL WITH MULTIPLE SAMPLES =");
            foreach (SentimentPrediction prediction in predictedResults)
            {
                Console.WriteLine(
                    $"SENTIMENT: {prediction.SentimentText}\n" +
                    $"PREDICTION: {(Convert.ToBoolean(prediction.Prediction) ? "Positive" : "Negative")}\n" +
                    $"PROBABILITY: {prediction.Probability} ");

            }
            Console.WriteLine("= END OF PREDICTION TEST =");
        }
    }
}
