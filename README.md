<img height=80 width=80 src="CodeChefLOGO.jpeg" /><h1>`Codechef`-PESUECC-Website</h1>

## To run scraper

### Download Firefox Browser ( Currently only works with Firefox )
https://www.mozilla.org/en-US/firefox/new/

### Download Geckodriver for Firefox
https://github.com/mozilla/geckodriver/releases

### Download the requirements
Best to do it in a virtual environment
  - ```python3 -m venv venv```     => Create a virtual environment folder called venv in present directory
  - ```source venv/bin/activate``` => Activate environment for Mac or Linux
  - ```cd venv/Scripts``` & ```activate.bat```  => On Windows

  - ```pip3 install -r requirements.txt```
  - ```deactivate```               => To deactivate venv

### Have the .env file in the same folder as scraper.py
### Run scraper.py
  ```python3 scraper.py```
