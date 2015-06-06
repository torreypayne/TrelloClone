# write some jbuilder to return some json about a board
# it should include the board
#  - its lists
#    - the cards for each list
json.extract! @board, :title, :id
# json.title @board.title
# json.id @board.id
json.lists @board.lists do |json, list|
  json.(list, :title)
end
