import json

file_path = "./db.json"

with open(file_path, 'r') as file:
    data_base = json.load(file)

c:dict = data_base['IID']

def parse(data_base, tabs = 1, first = 1, type_name="name"): # should make types if a dict has given
    if first: print(f"type {type_name} = {'{'}")

    for data in data_base:
        if type(data_base[data]) == str:
            print("  "*tabs+f'{data}: string;')

        if type(data_base[data]) == int or type(data_base[data]) == float:
            print("  "*tabs+f'{data}: number;')

        if type(data_base[data]) == dict:
            print("  "*tabs+f'{data}: '+'{')
            parse(data_base[data], tabs+1, 0)
            print("  "*tabs+"};")

    if first: print("};")


def makeSql(dataJ):

  for iid in dataJ:
    dataIID = []
    for data in iid:
      if data != 'id':
        dataIID.append(iid[data])
    
    print(f'{dataIID},'.replace('[','(').replace(']',')'))


parse(c[0], type_name="IID")

print("\nSQL VALUES FROM JSON DB: \n")
makeSql(c)