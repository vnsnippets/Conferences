using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using GalaSoft.MvvmLight.Views;
using Microsoft.ProjectOxford.Vision;
using Microsoft.ProjectOxford.Vision.Contract;
using System;
using System.Threading.Tasks;
using VisionUWP.Helpers;

namespace VisionUWP.ViewModels
{
    public class VisionViewModel : ViewModelBase
    {
        private INavigationService Navigator;

        public VisionViewModel(INavigationService navigationService)
        {
            Navigator = navigationService;
        }

        /// <summary>
        /// The <see cref="URL" /> property's name.
        /// </summary>
        public const string URLPropertyName = "URL";

        private string _url = "";

        /// <summary>
        /// Sets and gets the Date property.
        /// Changes to that property's value raise the PropertyChanged event. 
        /// </summary>
        public string URL
        {
            get
            {
                return _url;
            }

            set
            {
                if (_url == value)
                {
                    return;
                }

                _url = value;
                RaisePropertyChanged(URLPropertyName);
            }
        }

        /// <summary>
        /// The <see cref="Status" /> property's name.
        /// </summary>
        public const string StatusPropertyName = "Status";

        private string _status = "";

        /// <summary>
        /// Sets and gets the Date property.
        /// Changes to that property's value raise the PropertyChanged event. 
        /// </summary>
        public string Status
        {
            get
            {
                return _status;
            }

            set
            {
                if (_status == value)
                {
                    return;
                }

                _status = value;
                RaisePropertyChanged(StatusPropertyName);
            }
        }

        private RelayCommand _backToMain;

        /// <summary>
        /// Gets the BackToMain.
        /// </summary>
        public RelayCommand BackToMain
        {
            get
            {
                return _backToMain
                    ?? (_backToMain = new RelayCommand(
                    () =>
                    {
                        Navigator.NavigateTo(NavigationKeys.MainPage);
                    }));
            }
        }

        private RelayCommand _analyzeImage;

        /// <summary>
        /// Gets the AnalyzeImage.
        /// </summary>
        public RelayCommand AnalyzeImage
        {
            get
            {
                return _analyzeImage
                    ?? (_analyzeImage = new RelayCommand(
                    async () =>
                    {
                        if (String.IsNullOrEmpty(URL) || String.IsNullOrWhiteSpace(URL))
                        {
                            Log("IMAGE URL IS BLANK...");
                        }
                        else
                        {
                            Status = "";
                            Uri IMGSource = new Uri(URL);
                            await InitializeAnalysis(IMGSource);
                        }
                    }));
            }
        }

        private RelayCommand _describeImage;

        /// <summary>
        /// Gets the DescribeImage.
        /// </summary>
        public RelayCommand DescribeImage
        {
            get
            {
                return _describeImage
                    ?? (_describeImage = new RelayCommand(
                    async () =>
                    {
                        if (String.IsNullOrEmpty(URL) || String.IsNullOrWhiteSpace(URL))
                        {
                            Log("IMAGE URL IS BLANK...");
                        }
                        else
                        {
                            Status = "";
                            Uri IMGSource = new Uri(URL);
                            await InitializeDescription(IMGSource);
                        }
                    }));
            }
        }

        private RelayCommand _analyzeTags;

        /// <summary>
        /// Gets the AnalyzeTags.
        /// </summary>
        public RelayCommand AnalyzeTags
        {
            get
            {
                return _analyzeTags
                    ?? (_analyzeTags = new RelayCommand(
                    async () =>
                    {
                        if (String.IsNullOrEmpty(URL) || String.IsNullOrWhiteSpace(URL))
                        {
                            Log("IMAGE URL IS BLANK...");
                        }
                        else
                        {
                            Status = "";
                            Uri IMGSource = new Uri(URL);
                            await InitializeGenerateTags(IMGSource);
                        }
                    }));
            }
        }


        //ADDITIONAL FUNCTIONS
        protected void Log(string Message)
        {
            if (String.IsNullOrEmpty(Message) || Message == "\n")
            {
                Status += "\n";
            }
            else
            {
                string timeStr = DateTime.Now.ToString("HH:mm:ss.ffffff");
                string messaage = "[" + timeStr + "]: " + Message + "\n";
                Status += messaage;
            }
        }

        protected void LogAnalysisResult(AnalysisResult result)
        {
            if (result == null)
            {
                Log("null");
                return;
            }

            if (result.Metadata != null)
            {
                Log("Image Format : " + result.Metadata.Format);
                Log("Image Dimensions : " + result.Metadata.Width + " x " + result.Metadata.Height);
            }

            if (result.ImageType != null)
            {
                string clipArtType;
                switch (result.ImageType.ClipArtType)
                {
                    case 0:
                        clipArtType = "0 Non-clipart";
                        break;
                    case 1:
                        clipArtType = "1 ambiguous";
                        break;
                    case 2:
                        clipArtType = "2 normal-clipart";
                        break;
                    case 3:
                        clipArtType = "3 good-clipart";
                        break;
                    default:
                        clipArtType = "Unknown";
                        break;
                }
                Log("Clip Art Type : " + clipArtType);

                string lineDrawingType;
                switch (result.ImageType.LineDrawingType)
                {
                    case 0:
                        lineDrawingType = "0 Non-LineDrawing";
                        break;
                    case 1:
                        lineDrawingType = "1 LineDrawing";
                        break;
                    default:
                        lineDrawingType = "Unknown";
                        break;
                }
                Log("\nLine Drawing Type : " + lineDrawingType);
            }


            if (result.Adult != null)
            {
                Log("Is Adult Content : " + result.Adult.IsAdultContent);
                Log("Adult Score : " + result.Adult.AdultScore);
                Log("Is Racy Content : " + result.Adult.IsRacyContent);
                Log("Racy Score : " + result.Adult.RacyScore);
            }

            if (result.Categories != null && result.Categories.Length > 0)
            {
                Log("Categories : ");
                foreach (var category in result.Categories)
                {
                    Log("   Name : " + category.Name + "; Score : " + category.Score);
                }
            }

            if (result.Faces != null && result.Faces.Length > 0)
            {
                Log("Faces : ");
                foreach (var face in result.Faces)
                {
                    Log("   Age : " + face.Age + "; Gender : " + face.Gender);
                }
            }

            if (result.Color != null)
            {
                Log("AccentColor : " + result.Color.AccentColor);
                Log("Dominant Color Background : " + result.Color.DominantColorBackground);
                Log("Dominant Color Foreground : " + result.Color.DominantColorForeground);

                if (result.Color.DominantColors != null && result.Color.DominantColors.Length > 0)
                {
                    string colors = "Dominant Colors : ";
                    foreach (var color in result.Color.DominantColors)
                    {
                        colors += color + " ";
                    }
                    Log(colors);
                }
            }

            if (result.Description != null)
            {
                Log("Description : ");
                foreach (var caption in result.Description.Captions)
                {
                    Log("   Caption : " + caption.Text + "; Confidence : " + caption.Confidence);
                }
                string tags = "   Tags : ";
                foreach (var tag in result.Description.Tags)
                {
                    tags += tag + ", ";
                }
                Log(tags);

            }

            if (result.Tags != null)
            {
                Log("Tags: ");
                foreach (var tag in result.Tags)
                {
                    Log("   " + tag.Name + ": " + tag.Confidence);
                }
            }

        }

        private async Task InitializeAnalysis(Uri IMGUri)
        {
            try
            {
                Log("ANALYZING...");

                AnalysisResult Result;
                string AbsoluteURI = IMGUri.AbsoluteUri;

                // -----------------------------------------------------------------------
                // KEY SAMPLE CODE STARTS HERE
                // -----------------------------------------------------------------------

                //
                // Create Project Oxford Vision API Service client
                //
                VisionServiceClient VisionServiceClient = new VisionServiceClient(Constants.VisionKey);
                Log("VisionServiceClient is created");

                //
                // Analyze the url for all visual features
                //
                Log("Calling VisionServiceClient.AnalyzeImageAsync()...");
                VisualFeature[] visualFeatures = new VisualFeature[] { VisualFeature.Adult, VisualFeature.Categories, VisualFeature.Color, VisualFeature.Description, VisualFeature.Faces, VisualFeature.ImageType, VisualFeature.Tags };
                Result = await VisionServiceClient.AnalyzeImageAsync(AbsoluteURI, visualFeatures);

                // -----------------------------------------------------------------------
                // KEY SAMPLE CODE ENDS HERE
                // -----------------------------------------------------------------------

                Status = "ANALYSIS RESULT \n";
                LogAnalysisResult(Result);
            }
            catch (Exception exception)
            {
                // Something wen't wrong :(
                Status = (exception.ToString());
            }
        }

        protected async Task InitializeDescription(Uri IMGUri)
        {
            Log("DESCRIBING IMAGE...");

            AnalysisResult Result;
            string AbsoluteURI = IMGUri.AbsoluteUri;

            // -----------------------------------------------------------------------
            // KEY SAMPLE CODE STARTS HERE
            // -----------------------------------------------------------------------

            //
            // Create Project Oxford Vision API Service client
            //
            VisionServiceClient VisionServiceClient = new VisionServiceClient(Constants.VisionKey);
            Log("VisionServiceClient is created");

            //
            // Describe the url and ask for three captions
            //
            Log("Calling VisionServiceClient.DescribeAsync()...");
            Result = await VisionServiceClient.DescribeAsync(AbsoluteURI, 3);

            // -----------------------------------------------------------------------
            // KEY SAMPLE CODE ENDS HERE
            // -----------------------------------------------------------------------

            Status = "DESCRIPTION DONE.";

            //
            // Log analysis result in the log window
            //
            Log("");
            Log("Describe Result:");
            LogAnalysisResult(Result);
        }


        protected async Task InitializeGenerateTags(Uri IMGUri)
        {
            Log("DESCRIBING IMAGE...");

            AnalysisResult Result;
            string AbsoluteURI = IMGUri.AbsoluteUri;

            // -----------------------------------------------------------------------
            // KEY SAMPLE CODE STARTS HERE
            // -----------------------------------------------------------------------

            //
            // Create Project Oxford Vision API Service client
            //
            VisionServiceClient VisionServiceClient = new VisionServiceClient(Constants.VisionKey);
            Log("VisionServiceClient is created");

            //
            // Generate tags for the given url
            //
            Log("Calling VisionServiceClient.GetTagsAsync()...");
            Result = await VisionServiceClient.GetTagsAsync(AbsoluteURI);

            // -----------------------------------------------------------------------
            // KEY SAMPLE CODE ENDS HERE
            // -----------------------------------------------------------------------

            Status = "TAG GENERATION DONE.";

            //
            // Log analysis result in the log window
            //

            Log("");
            Log("Get Tags Result:");
            LogAnalysisResult(Result);
        }
    }
}
