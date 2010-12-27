class AddIssueNumberToIssues < ActiveRecord::Migration
  def self.up
    add_column :issues, :number, :integer
  end

  def self.down
    remove_column :issues, :number
  end
end
