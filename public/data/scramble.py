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
    
    # Continue scrambling until it's not the original and not reversed
    while (scrambled == original or scrambled == reversed_name) and attempts < 50:
        char_list = list(original)
        random.shuffle(char_list)
        scrambled = "".join(char_list)
        attempts += 1
        
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
        if all(len(re.sub(r'[^a-zA-Z]', '', p)) >= 3 for p in parts):
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
  { "answer": "LeBron James" },
  { "answer": "Taylor Swift" },
  { "answer": "Cristiano Ronaldo" },
  { "answer": "Selena Gomez" },
  { "answer": "Stephen Curry" },
  { "answer": "Ariana Grande" },
  { "answer": "Justin Bieber" },
  { "answer": "Kendrick Lamar" },
  { "answer": "Dwayne Johnson" },
  { "answer": "Billie Eilish" },
  { "answer": "Lionel Messi" },
  { "answer": "Margot Robbie" },
  { "answer": "Travis Kelce" },
  { "answer": "Patrick Mahomes" },
  { "answer": "Kylie Jenner" },
  { "answer": "Lewis Hamilton" },
  { "answer": "Donald Trump" },
  { "answer": "Barack Obama" },
  { "answer": "Shohei Ohtani" },
  { "answer": "Kanye West" },
  { "answer": "Harry Styles" },
  { "answer": "Kevin Durant" },
  { "answer": "Bruno Mars" },
  { "answer": "Khloe Kardashian" },
  { "answer": "Robert Downey" },
  { "answer": "Chris Evans" },
  { "answer": "Scarlett Johansson" },
  { "answer": "Tom Holland" },
  { "answer": "Jason Momoa" },
  { "answer": "Caitlin Clark" },
  { "answer": "Angel Reese" },
  { "answer": "Victor Wembanyama" },
  { "answer": "Novak Djokovic" },
  { "answer": "Rafael Nadal" },
  { "answer": "Roger Federer" },
  { "answer": "Serena Williams" },
  { "answer": "Tiger Woods" },
  { "answer": "Kamala Harris" },
  { "answer": "Bernie Sanders" },
  { "answer": "Elon Musk" },
  { "answer": "Jeff Bezos" },
  { "answer": "Mark Zuckerberg" },
  { "answer": "Charli D'Amelio" },
  { "answer": "Olivia Rodrigo" },
  { "answer": "Shawn Mendes" },
  { "answer": "Warren Buffett" },
  { "answer": "Oprah Winfrey" },
  { "answer": "Ellen DeGeneres" },
  { "answer": "Gordon Ramsay" },
  { "answer": "Anthony Bourdain" },
  { "answer": "Martha Stewart" },
  { "answer": "Bobby Flay" }
]

scrambled_json = generate_scramble_json(players)
with open("scramble_output.json", "w") as f:
    json.dump(scrambled_json, f, indent=2)
print("JSON output saved to scramble_output.json")