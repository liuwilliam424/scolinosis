
# ScoliNOsis Wearable Sensor Project
# Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
# 6/8/22
# Data compiler to export for data analysis.
# 
# HEY, if you want to compile current Firestore data for a user organized by time with processed values, just run this in your commandline
# npx -p node-firestore-import-export firestore-export -a credentials.json -b raw.json
#And then you have to run this file and you'll see 'data.txt'

# source: https://gunargessner.com/firestore-backup 

import json

#put authentication UID here
user = "xU4mqGAcm4eA2bg9v5aD9oBEOvI2"

#load files for processing
raw_file = open("raw.json", "r")
python_file = json.loads(raw_file.read())
sids_file = python_file["__collections__"][user]

#order by time using python sorted and choosing time as a key
ordered_keys = sorted(sids_file, key=lambda datapoint:sids_file[datapoint]["time"]["value"]["_seconds"])

#create a new dictionary based on ordered keys with only the valuable data
ordered_file = {}
lst = []
for i, key in enumerate(ordered_keys):
    k = "datapoint" + str(i)
    if(int(sids_file[key]["time"]["value"]["_seconds"])>1654474078):
        processed_value = 90 - (((sids_file[key]["left"]["orientation"][0]+sids_file[key]["right"]["orientation"][0]))/2) 
        # ordered_file[k] = {"time": sids_file[key]["time"]["value"]["_seconds"], "raw_values": {"left": sids_file[key]["left"]["orientation"], "right": sids_file[key]["right"]["orientation"]},"processed_values": processed_value}
        lst.append(processed_value)


#write data to new txt file; it's still unformatted and bunched together
new_file = open("data.txt", "w")
# new_file.write(json.dumps(ordered_file))
new_file.write(str(lst))

# print(ordered_file)