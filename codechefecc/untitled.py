# pip install supabase-py
# pip install selenium

from supabase_py import create_client

from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver import Keys, ActionChains
from selenium.common.exceptions import NoSuchElementException
import time

from dotenv import dotenv_values

# Load the environment variables
config = dotenv_values(".env")
supabase_url = config['SUPABASE_URL']
supabase_key = config['SUPABASE_ANON_KEY']

options = webdriver.FirefoxOptions()
# options.add_argument('-headless')  # Comment this line for the browser to be visible

# Connect to the Supabase database
supabase = create_client(supabase_url, supabase_key)

# Create the service object
service = Service('/Users/varun/Desktop/Projects/geckodriver')

# Create the driver object
driver = webdriver.Firefox(service=service, options=options)

# URL of the Hackerrank contest
path = 'https://www.hackerrank.com/contests/binary-battle/leaderboard'

# Open the Hackerrank leaderboard
driver.get(path)

# Wait for the page to load
time.sleep(10)

# Press the page down key
ActionChains(driver)\
	.send_keys(Keys.PAGE_DOWN)\
	.perform()

# Find the pagination list
pagination_list_div = driver.find_element(By.CSS_SELECTOR, '.pagination')
pagination_list = pagination_list_div.find_elements(By.XPATH, '*')[0]
list_elements = pagination_list.find_elements(By.XPATH, '*')

# Find the total number of pages
number_of_pages = int(list_elements[-3].text)
current_page = 1

# Get the name of the contestant from alias
def get_name(contestant):
	inner_div_big = contestant.find_elements(By.XPATH, '*')[0]
	inner_div_name = inner_div_big.find_elements(By.XPATH, '*')[1]
	p_tag_with_name = inner_div_name.find_elements(By.XPATH, '*')[0]
	anchor_tag = p_tag_with_name.find_elements(By.XPATH, '*')[0]

	anchor_tag.click()

	# Wait for the page to load
	time.sleep(10)

	# Switch to the new tab
	driver.switch_to.window(driver.window_handles[-1])

	# Get the name of the contestant
	name = driver.find_element(By.CSS_SELECTOR, '.profile-heading').text

	# Get profile image as well
	try:
		image = driver.find_element(By.CLASS_NAME, 'ui-avatar__img').get_attribute('src')
	except NoSuchElementException:
		style_attr = driver.find_element(By.CLASS_NAME, 'ui-avatar__initials').get_attribute('style')
		image = style_attr.split('(')[1].split(')')[0][1:-1]

	# Close the tab
	driver.close()

	# Switch back to main tab
	driver.switch_to.window(driver.window_handles[0])

	return name, image

while current_page <= number_of_pages:

	# Find the leaderboard table
	table = driver.find_element(By.ID, 'leaders')

	# Get the contestants
	for contestant in table.find_elements(By.XPATH, '*'):
		contestant_list_data = contestant.text.split('\n')

		img_name = get_name(contestant)

		contestant_dict_data = {
			"name": img_name[0],
			"alias": contestant_list_data[1],
			"score": float(contestant_list_data[2]),
			"time": contestant_list_data[3],
			"profile_image": img_name[1]
		}

		# Insert the data into the database
		response = supabase.table('leaderboard').insert(contestant_dict_data).execute()

		# If the data already exists, update the score and the time
		if response['status_code'] == 409:
			
			# Shit 3rd party library, throws JSON error when calling delete function. But row is deleted on database
			try:
				# Delete the existing row
				supabase.table('leaderboard').delete().eq('alias', contestant_dict_data['alias']).execute()
			except:
				pass

			# Insert new row
			supabase.table('leaderboard').insert(contestant_dict_data).execute()


		print(response)

	# Go to the next page
	current_page += 1
	driver.get(path + "/" + str(current_page))

	# Wait for the page to load
	time.sleep(10)

# Close the browser
driver.quit()