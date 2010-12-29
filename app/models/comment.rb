class Comment < ActiveRecord::Base
  belongs_to :issue
  belongs_to :user
  has_many :images, :as => :imageable
end
