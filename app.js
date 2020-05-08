const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  upload = multer();
clearCache = require("./services/cache");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MONGODB SETUP

mongoose.connect("mongodb://mongo:27017/redisdemo", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .once("open", () => console.log("connected to database"))
  .on("error", err => console.log("connection to database failed!!", err));

const vehicle = require("./models/vehicle");

app.use(upload.array());
app.use(express.static("public"));

// ROUTES

app.get("/news", (req, res) => {
  res.json({
    status: "ok",
    source: "cnn",
    sortBy: "top",
    articles: [
      {
        author: "Analysis by Stephen Collinson, CNN",
        title:
          "The price of reopening the economy: tens of thousands of American lives",
        description:
          "President Donald Trump now knows the price of the haunting bargain required to reopen the country -- tens of thousands more lives in a pandemic that is getting worse not better.",
        url:
          "http://us.cnn.com/2020/05/05/politics/donald-trump-coronavirus-economy-models/index.html",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200430134358-01-trump-0421-super-tease.jpg",
        publishedAt: "2020-05-05T04:02:25Z"
      },
      {
        author: "Pete Muntean, CNN Business",
        title:
          "United Airlines COO says employees should 'seriously consider' voluntary separation from the airline",
        description:
          "A top executive at United Airlines is telling employees to consider leaving the company voluntarily as it grapples with the consequences of the coronavirus pandemic.",
        url:
          "http://us.cnn.com/2020/05/04/business/united-voluntary-separation/index.html",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200504205708-united-airlines-0320-super-tease.jpg",
        publishedAt: "2020-05-05T01:54:54Z"
      },
      {
        author: "Paul LeBlanc, CNN",
        title: "Fauci says calls for his dismissal are 'part of the game'",
        description:
          'Dr. Anthony Fauci, a key member of the White House coronavirus task force, said Monday evening that calls for his dismissal are "part of the game" as he continues to urge Americans to practice social distancing.',
        url:
          "http://us.cnn.com/2020/05/04/politics/fauci-coronavirus-cnntv/index.html",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200501192359-fauci-0422-super-tease.jpg",
        publishedAt: "2020-05-05T02:40:31Z"
      },
      {
        author:
          'By <a href="/profiles/julia-hollingsworth">Julia Hollingsworth</a> and Adam Renton, CNN',
        title: "Coronavirus updates from around the world - CNN",
        description:
          "The global coronavirus pandemic has brought countries around the world to a standstill. Here's the latest updates on worldwide Covid-19 cases, deaths, government responses, and more.",
        url:
          "https://www.cnn.com/world/live-news/coronavirus-pandemic-05-05-20-intl/index.html",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200213175742-05-coronavirus-0213-super-tease.jpg",
        publishedAt: "2020-05-05T01:16:55Z"
      },
      {
        author: null,
        title:
          "Leaked video shows expecting moms near Covid-19 patients in Brazil - CNN Video",
        description:
          "Despite Brazil having more than 100,000 confirmed cases of Covid-19, President Jair Bolsonaro is still shaking hands, joining in on protests and comparing the pandemic to a small flu.",
        url:
          "http://us.cnn.com/videos/world/2020/05/05/expecting-mothers-next-to-covid-patients-jair-bolsonaro-brazil-coronavirus-isa-soares-pkg-vpx.cnn",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200504203403-brazil-coronavirus-01-super-tease.jpg",
        publishedAt: null
      },
      {
        author: "Jessie Yeung, CNN",
        title: "How Hong Kong contained its second wave of Covid-19",
        description:
          "Hong Kong's success in surviving multiple waves of the virus provides hard earned lessons to other cities around the world now looking to relax restrictions.",
        url:
          "http://us.cnn.com/2020/05/05/asia/hong-kong-coronavirus-recovery-intl-hnk/index.html",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200505125145-hong-kong-coronavirus-life-02-super-tease.jpeg",
        publishedAt: "2020-05-05T06:00:54Z"
      },
      {
        author: "Analysis by Zachary B. Wolf, CNN",
        title: "The Dutch are inventing new words to describe coronavirus",
        description:
          "Severe backlash to the Covid-19 shutdown may be felt among a minority of the US population, according to polls, but it has gotten fierce and deadly.",
        url:
          "http://us.cnn.com/2020/05/05/politics/what-matters-may-4/index.html",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200424142606-coronavirus-greeting-0424-netherlands-super-tease.jpg",
        publishedAt: "2020-05-05T04:04:42Z"
      },
      {
        author: "Chris Isidore, CNN Business",
        title: "Some retailers are too broke to go bankrupt",
        description: "Everything must go!",
        url:
          "http://us.cnn.com/2020/05/04/business/retailers-lack-of-store-closing-sales-delaying-bankruptcy/index.html",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200427152849-01-jc-penney-store-0416-restricted-super-tease.jpg",
        publishedAt: "2020-05-04T17:04:34Z"
      },
      {
        author: null,
        title:
          "See historian's reaction when Trump compares himself to Lincoln - CNN Video",
        description:
          "President Trump said he believes the media treats him worse than President Abraham Lincoln at a Fox News town hall.",
        url:
          "http://us.cnn.com/videos/politics/2020/05/04/trump-lincoln-comparison-fox-news-town-hall-newday-vpx.cnn",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200504140842-trump-lincoln-memorial-fox-town-hall-coronavirus-super-tease.jpg",
        publishedAt: null
      },
      {
        author: null,
        title:
          "Nancy Pelosi responds to Trump's payroll tax cut demand: No way - CNN Video",
        description:
          "House Speaker Nancy Pelosi responds to President Donald Trump's threat that he'll block the next coronavirus relief package unless Congress cuts payroll taxes.",
        url:
          "http://us.cnn.com/videos/politics/2020/05/04/nancy-pelosi-payroll-tax-cut-trump-response-sot-tsr-vpx.cnn",
        urlToImage:
          "https://cdn.cnn.com/cnnnext/dam/assets/200504192320-nancy-pelosi-payroll-tax-cut-super-tease.jpg",
        publishedAt: null
      }
    ]
  });
});

app.get("/", (req, res) => {
  vehicle
    .find({})
    .then(data => {
      res.json({ found: true, data: data });
    })
    .catch(err => {
      console.log(err);
      res.json({ found: false, data: null });
    });
});

app.post("/vehicle", (req, res) => {
  new vehicle(req.body)
    .save()
    .then(v_data => {
      console.log(v_data);
      res.json({ save: true });
      clearCache(v_data.vehicleType);
    })
    .catch(err => {
      console.log(err);
      res.json({ save: false });
    });
});

app.get("/:vehicleType/", (req, res) => {
  vehicle
    .find({ vehicleType: req.params.vehicleType })
    .cache(req.params.vehicleType)
    .then(data => {
      if (data) {
        res.json({ found: true, data: data });
      } else {
        res.json({ found: false, data: null });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ found: false, data: null });
    });
});

app.get("/:vehicleType/:sno", (req, res) => {
  vehicle
    .findOne({ serialno: req.params.sno, vehicleType: req.params.vehicleType })
    .cache(req.params.vehicleType)
    .then(data => {
      if (data) {
        res.json({ found: true, data: data });
      } else {
        res.json({ found: false, data: null });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({ found: false, data: null });
    });
});

app.listen(3000, () => console.log("server started at port:3000"));
