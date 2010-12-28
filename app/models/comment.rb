class Comment < ActiveRecord::Base
  belongs_to :issue
  belongs_to :user
  
  mount_uploader :image, ImageUploader
end
