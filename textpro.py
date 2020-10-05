def sentence_maker(phrase):
    interrogatives=("how","why","what")
    capitalized=phrase.capitalize()
    if phrase.startswith(interrogatives):
        return "{}?".format(capitalized)
    else:
        return "{}.".format(capitalized)


print(sentence_maker("how are you"))

result=[]

while True:
    user_input=input("Say Something: ")
    if user_input=="/end":
        break
    else:
        result.append(sentence_maker(user_input))

print(" ".join(result))


