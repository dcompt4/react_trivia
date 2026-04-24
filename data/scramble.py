import random
import json
import re

def scramble_name(name):
    """
    Scrambles a string and ensures it's not the original or reversed.
    """
    original = name.lower()
    reversed_name = original[::-1]
    scrambled = original
    attempts = 0
    
    # Continue scrambling until it's not the original, not reversed, and first letter is not the same
    while ((scrambled == original or scrambled == reversed_name or scrambled[0] == original[0]) and attempts < 50):
      char_list = list(original)
      random.shuffle(char_list)
      scrambled = "".join(char_list)
      attempts += 1
    # If after 50 attempts, first letter is still the same, try to swap first letter with another
    if scrambled[0] == original[0] and len(scrambled) > 1:
      for i in range(1, len(scrambled)):
        if scrambled[i] != original[0]:
          scrambled = scrambled[i] + scrambled[1:i] + scrambled[0] + scrambled[i+1:]
          break
    return scrambled

def generate_scramble_json(data):
    """
    Processes the player list: filters out names with parts < 3 letters 
    and scrambles the remaining ones.
    """
    processed_list = []
    
    # Filter logic
    filtered_data = []
    for item in data:
        parts = item["answer"].split(" ")
        # Check if every part (removing non-alpha chars) is at least 3 letters
        if all(len(re.sub(r'[^a-zA-Z]', '', p)) > 3 for p in parts):
            filtered_data.append(item)
            
    random.shuffle(filtered_data)
    
    # Mapping/Scrambling logic
    for index, item in enumerate(filtered_data):
        parts = item["answer"].split(" ")
        scrambled_parts = [scramble_name(p) for p in parts]
        
        processed_list.append({
            "id": index + 1,
            "scrambled": " ".join(scrambled_parts),
            "answer": item["answer"]
        })
        
    return processed_list

# Example usage:
players = [
  { "answer": "Derrick Jones Jr." },
  { "answer": "Precious Achiuwa" },
  { "answer": "Khris Middleton" },
  { "answer": "Neemias Queta" },
  { "answer": "Egor Demin" },
  { "answer": "A.J. Green" },
  { "answer": "Bub Carrington" },
  { "answer": "Jakob Poeltl" },
  { "answer": "Rudy Gobert" },
  { "answer": "Julian Champagnie" },
  { "answer": "Kyle Filipowski" },
  { "answer": "Pelle Larsson" },
  { "answer": "Rui Hachimura" },
  { "answer": "Jarace Walker" },
  { "answer": "Mark Williams" },
  { "answer": "Derik Queen" },
  { "answer": "Bilal Coulibaly" },
  { "answer": "Nic Claxton" },
  { "answer": "Wendell Carter Jr." },
  { "answer": "Dyson Daniels" },
  { "answer": "Myles Turner" },
  { "answer": "Christian Braun" },
  { "answer": "Josh Hart" },
  { "answer": "Donovan Clingan" },
  { "answer": "Moses Moody" },
  { "answer": "Duncan Robinson" },
  { "answer": "Donte DiVincenzo" },
  { "answer": "Tre Johnson" },
  { "answer": "Cameron Johnson" },
  { "answer": "Noah Clowney" },
  { "answer": "Max Christie" },
  { "answer": "Deandre Ayton" },
  { "answer": "Maxime Raynaud" },
  { "answer": "Jaylen Wells" },
  { "answer": "Collin Gillespie" },
  { "answer": "Kyle Kuzma" },
  { "answer": "Jaylon Tyson" },
  { "answer": "Tobias Harris" },
  { "answer": "Toumani Camara" },
  { "answer": "John Collins" },
  { "answer": "Cedric Coward" },
  { "answer": "Jalen Suggs" },
  { "answer": "Ace Bailey" },
  { "answer": "Aaron Nesmith" },
  { "answer": "Brandin Podziemski" },
  { "answer": "Devin Vassell" },
  { "answer": "Tre Jones" },
  { "answer": "Kelly Oubre Jr." },
  { "answer": "Ivica Zubac" },
  { "answer": "P.J. Washington" },
  { "answer": "Jeremiah Fears" },
  { "answer": "Mikal Bridges" },
  { "answer": "Peyton Watson" },
  { "answer": "Kyshawn George" },
  { "answer": "Jaden McDaniels" },
  { "answer": "Anthony Black" },
  { "answer": "Nikola Vucevic" },
  { "answer": "Russell Westbrook" },
  { "answer": "Onyeka Okongwu" },
  { "answer": "Naji Marshall" },
  { "answer": "Jarrett Allen" },
  { "answer": "Andrew Wiggins" },
  { "answer": "Jabari Smith Jr." },
  { "answer": "VJ Edgecombe" },
  { "answer": "Matas Buzelis" },
  { "answer": "Alex Sarr" },
  { "answer": "Jrue Holiday" },
  { "answer": "Immanuel Quickley" },
  { "answer": "Derrick White" },
  { "answer": "Stephon Castle" },
  { "answer": "OG Anunoby" },
  { "answer": "Andrew Nembhard" },
  { "answer": "Josh Giddey" },
  { "answer": "Payton Pritchard" },
  { "answer": "Miles Bridges" },
  { "answer": "Chet Holmgren" },
  { "answer": "Ryan Rollins" },
  { "answer": "Saddiq Bey" },
  { "answer": "Scottie Barnes" },
  { "answer": "Evan Mobley" },
  { "answer": "Amen Thompson" },
  { "answer": "DeMar DeRozan" }
]
scrambled_json = generate_scramble_json(players)
with open("scramble_output.json", "w") as f:
    json.dump(scrambled_json, f, indent=2)
print("JSON output saved to scramble_output.json")