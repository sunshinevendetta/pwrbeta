import random
import string

# Define character sets with more abstract and cool glitched glyphs
glyphs = "⌬≡⊖⦿⌬⧉▒★⧉✧･ﾟ:✧･ﾟ⟁⟐⟑⦻⦼⦽⧬⧭"
ascii_chars = string.printable
glitch_chars = "⩫⩥⩤⩢⩣⚝░▒▓█⧸⧹⧺⧻◜◝◞◟"

# Function to encrypt the text with glyphs, ascii and glitch characters
def encrypt_text(text):
    encrypted = ""
    for char in text:
        if char.isalpha():
            # Replace alphabetic characters with glyphs or ASCII characters
            if random.random() < 0.3:
                encrypted += random.choice(glyphs)
            else:
                encrypted += random.choice(ascii_chars)
        else:
            # Replace non-alphabetic characters with glitch characters
            encrypted += random.choice(glitch_chars)
    
    # Add additional glitch effects
    encrypted = add_glitch_effects(encrypted)
    
    return encrypted

# Function to add additional glitch effects to the text
def add_glitch_effects(text):
    glitched = ""
    for char in text:
        if random.random() < 0.1:
            glitched += random.choice(glitch_chars)
        glitched += char
    return glitched

# Example usage
original_text = "1995 whispers a tale spun from the heart of raves golden era where beats were bold and spirits unbound. In this track, echoes of the past merge with the pulse of the present, crafting a timeless journey through dance and liberation. Each note, a footstep in clandestine warehouses each rhythm a heartbeat synchronized with the strobe's flicker. Here, amidst the embrace of house music's nascent bloom, the essence of unity and rebellion intertwines, casting spells of euphoria and fleeting freedom, 1995 isn't just a track; it's a portal to when the night was young, the future was wide open, and music was a revolution."
encrypted_text = encrypt_text(original_text)
print("Original text:", original_text)
print("Encrypted text:", encrypted_text)
