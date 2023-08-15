from PIL import Image

def create_photo_booth(background_file, photo1_file, photo2_file, photo3_file, output_file):
    # Open the background image
    background = Image.open(background_file)

    # Open the three photo files
    photo1 = Image.open(photo1_file).convert('RGBA')
    photo2 = Image.open(photo2_file).convert('RGBA')
    photo3 = Image.open(photo3_file).convert('RGBA')

    # Resize the photos to fit the background
    photo1 = photo1.resize((500, 500))
    photo2 = photo2.resize((500, 500))
    photo3 = photo3.resize((500, 500))

    # Apply a filter to the photos
    photo1 = photo1.filter(ImageFilter.GaussianBlur(radius=5))
    photo2 = photo2.filter(ImageFilter.GaussianBlur(radius=5))
    photo3 = photo3.filter(ImageFilter.GaussianBlur(radius=5))

    # Combine the photos with the background
    background.paste(photo1, (50, 50), photo1)
    background.paste(photo2, (600, 50), photo2)
    background.paste(photo3, (1150, 50), photo3)

    # Save the final photo booth image
    background.save(output_file)
create_photo_booth('background.jpg', 'photo1.png', 'photo2.png', 'photo3.png', 'output.jpg')