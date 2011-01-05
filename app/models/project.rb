class Project < ActiveRecord::Base
  has_many :issues, :dependent => :destroy
  
  acts_as_url :name, :url_attribute => :slug
  
  def to_param
    slug
  end
end
