class Comment < ActiveRecord::Base
  belongs_to :issue
  belongs_to :user
  has_many :images, :as => :imageable
  
  accepts_nested_attributes_for :images, :allow_destroy => true 
end
