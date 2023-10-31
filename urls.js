const fs = require('fs');
const axios = require('axios');
const { URL } = require('url'); // for parsing URLs

// command line argument check
// checks whether it has received a single command-line argument. `progess.argv` contains command-line arguments. 
// if the array's length is not equal to 3, it displays a usage message and exits the script with an error code
if(process.argv.length !== 3) {
    console.error('Usage: node urls.js FILENAME'); 
    process.exit(1);
}

// get the input file name
// script assumes that the provided command-line argument (second item in `process.argv`)is the name of the file containing the list of URLs
const inputFilename = process.argv[2];

// define async function 
// takes a URL as an argument and performs three steps: 
// 1. makes an HTTP GET request to the URL using `axios`
// 2. if the request is successful, it returns the HTML content of the response.
// 3. if an error occurs during the request, it logs an error message and returns `null`
async function fetchAndSaveUrlContent(url) {
    try{
        const response = await axios.get(url);
        return response.data;
    }   catch (error) {
        console.error(`Failed to fetch ${url}: ${error.message}`);
        return null;
    }
}

// this function takes a filename and HTML content as arguments
// it writes the HTML content to a file with the specified filename using `fs.writeFileSync`, encoding it as UTF-8
// logs a message indicating the file has been saved
function saveHtmlContentToFile(filename, content) {
    fs.writeFileSync(filename, content, 'utf-8');
    console.log(`Saved ${filename}`);
}

// read the list of URLs from the input file
// takes a URL as an argument and uses the `URL` object to parse the URL and extract the hostname - returning the hostname
function extractHostname(url) {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
}

// this function takes a filename as an argument and does five things: 
// 1. reads the content of the specified file, assuming it contains a list of URLS, and splits them into an array called 'urls'
// 2. iterates over the `urls` array
// 3. extracts the hostname for each URL using the `extractHostname` function
// 4. calls `fetchAndSaveUrlContent` to fetch the HTML content of the URL
// 5. saves the HTML content to a separate file with the same base name as the original file
async function processUrlsFromFile(filename) {
    try{
        const data = fs.readFileSync(filename, 'utf-8');
        const urls = data.split('\n');

        for (const url of urls) {
            const hostname = extractHostname(url);
            const htmlContent = await fetchAndSaveUrlContent(url);

            if(htmlContent !== null) {
                saveHtmlContentToFile(hostname, htmlContent);
            }
        }
    } catch (error) {
        console.error(`Error reading file ${filename}: ${error.message}`);
    }
}

// initiate the process of reading the file and fetching and saveing HTML content for each URL
processUrlsFromFile(inputFilename); 

// this script provides a way to process a list of URLs stored in a file, retrieve the HTML content of each URL, and save that content 
// to separate files with filenames based on the hostnames. 
// Error handling is in place to handle any issues during URL fetching and file operations.